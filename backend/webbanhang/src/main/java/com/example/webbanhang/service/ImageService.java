package com.example.webbanhang.service;

import java.io.IOException;
import java.io.InputStream;

import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import org.springframework.core.io.Resource;


import java.io.ByteArrayOutputStream;

@Service
public class ImageService {

	public byte[] loadImage(String imageName) throws IOException {
        Resource resource = new ClassPathResource("static/images/" + imageName);
        try (InputStream inputStream = resource.getInputStream()) {
            return toByteArray(inputStream);
        }
    }

    private byte[] toByteArray(InputStream inputStream) throws IOException {
        ByteArrayOutputStream buffer = new ByteArrayOutputStream();
        int nRead;
        byte[] data = new byte[1024];
        while ((nRead = inputStream.read(data, 0, data.length)) != -1) {
            buffer.write(data, 0, nRead);
        }
        buffer.flush();
        return buffer.toByteArray();
    }
}
