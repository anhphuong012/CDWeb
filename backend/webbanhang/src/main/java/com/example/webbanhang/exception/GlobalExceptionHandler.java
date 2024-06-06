package com.example.webbanhang.exception;

import com.cloudinary.api.ApiResponse;
import com.cloudinary.http44.api.Response;
import com.example.webbanhang.dto.Respone.ApiResponsee;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.example.webbanhang.dto.Respone.ApiResponsee;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(value = RuntimeException.class)
    ResponseEntity<ApiResponsee> handlingRuntimeException(RuntimeException exception) {

        ApiResponsee apiResponsee = new ApiResponsee();

        apiResponsee.setCode(ErrorCode.UNCATEGORIZED_EXCEPTION.getCode());
        apiResponsee.setMessage(ErrorCode.UNCATEGORIZED_EXCEPTION.getMessage());

        return ResponseEntity.badRequest().body(apiResponsee);
    }

    @ExceptionHandler(value = AppException.class)
    ResponseEntity<ApiResponsee> handlingAppException(AppException exception) {
        ErrorCode errorCode = exception.getErrorCode();
        ApiResponsee apiResponsee = new ApiResponsee();

        apiResponsee.setCode(errorCode.getCode());
        apiResponsee.setMessage(errorCode.getMessage());

        return ResponseEntity.badRequest().body(apiResponsee);
    }

    @ExceptionHandler(value = MethodArgumentNotValidException.class)
    ResponseEntity<ApiResponsee> handlingValidation(MethodArgumentNotValidException exception) {
        String enumKey = exception.getFieldError().getDefaultMessage();
        ErrorCode errorCode = ErrorCode.INVALID_KEY;

        try {
            errorCode.valueOf(enumKey);
        } catch (IllegalArgumentException e){

        }

        ApiResponsee apiResponsee = new ApiResponsee();

        apiResponsee.setCode(errorCode.getCode());
        apiResponsee.setMessage(errorCode.getMessage());

        return ResponseEntity.badRequest().body(apiResponsee);
    }


}
