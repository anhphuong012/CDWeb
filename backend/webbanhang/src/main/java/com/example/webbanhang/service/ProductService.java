package com.example.webbanhang.service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Locale.Category;
import java.util.Random;

import com.example.webbanhang.dto.ProductDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.cloudinary.Cloudinary;
import com.cloudinary.api.ApiResponse;
import com.cloudinary.utils.ObjectUtils;
import com.example.webbanhang.Entity.CategoryEntity;
import com.example.webbanhang.Entity.ProductEntity;
import com.example.webbanhang.model.ProductModel;
import com.example.webbanhang.repository.CategoryEntityRepository;
import com.example.webbanhang.repository.ProductEntiryRepository;
import com.example.webbanhang.repository.SizeEntityRepository;
import org.springframework.web.multipart.MultipartFile;

@Service
public class ProductService {
    @Autowired
    private ProductEntiryRepository productEntityRepository;

    @Autowired
    private CategoryEntityRepository categoryEntityRepository;

    @Autowired
    private SizeEntityRepository repository;

    @Autowired
    private Cloudinary cloudinary;

    @Autowired
    private ImageService imageService;

    @Value("${image.storage.path}")
    private String path;

    @Value("${url.base}")
    private String baseUrl;

    public List<ProductModel> findAllProduct() throws Exception {
        Iterator<ProductEntity> listPd = productEntityRepository.findAll().iterator();
        List<ProductModel> result = new ArrayList<>();
        ProductModel productModel;
        ProductEntity productEntity;
        while (listPd.hasNext()) {
            productEntity = listPd.next();
            productModel = ProductModel.convert(productEntity);

            String url = baseUrl + "/api/file/" + productEntity.getImage() + ".jpg";

            productModel.setImage(url);

            result.add(productModel);
        }
        return result;
    }

    public List<ProductModel> findProductByName(String name) {
        List<ProductEntity> listPd = productEntityRepository.findByNameContains(name);
        List<ProductModel> result = new ArrayList<>();
        ProductModel productModel;

        for (ProductEntity productEntity : listPd) {

            productModel = ProductModel.convert(productEntity);

            String url = baseUrl + "/api/file/" + productEntity.getImage() + ".jpg";

            productModel.setImage(url);

            result.add(productModel);
        }
        return result;
    }

    public List<ProductModel> findProductByCategory(Long id) {
        CategoryEntity cate = categoryEntityRepository.findById(id).get();

        List<ProductEntity> listPd = productEntityRepository.findByCategory(cate);
        List<ProductModel> result = new ArrayList<>();
        ProductModel productModel;
        for (ProductEntity productEntity : listPd) {
            productModel = ProductModel.convert(productEntity);

            String url = baseUrl + "/api/file/" + productEntity.getImage() + ".jpg";

            productModel.setImage(url);

            result.add(productModel);
        }
        return result;
    }

    public ProductModel findById(Long id) {
        ProductEntity productEntity = productEntityRepository.findById(id).get();
        ProductModel productModel = ProductModel.convert(productEntity);
        String url = baseUrl + "/api/file/" + productEntity.getImage() + ".jpg";

        productModel.setImage(url);

        return productModel;

    }

    public ProductModel addProduct(ProductDTO productDTO, MultipartFile file) throws IOException {
        ProductEntity productEntity = new ProductEntity();
        productEntity.setName(productDTO.getName());
        productEntity.setPrice(productDTO.getPrice());
        productEntity.setDescreption(productDTO.getDescreption());
        productEntity.setCategory(categoryEntityRepository.findById(productDTO.getCategory_id()).get());

        Long size = productEntityRepository.count() + 1;
        System.out.println("Size:" + size);

        productEntity.setImage(size.toString() + "0" + new Random().nextInt(1000));

        ProductEntity productSave = productEntityRepository.save(productEntity);
        System.out.println("Product:" + productSave.toString());
        imageService.uploadFile(path, productSave.getImage() + ".jpg", file);

        String url = baseUrl + "/api/file/" + productEntity.getImage() + ".jpg";

        ProductModel productModel = ProductModel.convert(productSave);
        productModel.setImage(url);

        return productModel;
    }

    public ProductModel updateProduct(Long id, ProductDTO productDTO, MultipartFile file) throws IOException {
        ProductEntity productEntity = productEntityRepository.findById(id).get();

        productEntity.setName(productDTO.getName());
        productEntity.setPrice(productDTO.getPrice());
        productEntity.setDescreption(productDTO.getDescreption());

        CategoryEntity categoryEntity = categoryEntityRepository.findById(productDTO.getCategory_id()).get();

        productEntity.setCategory(categoryEntity);

        if (file != null) {
//            Files.deleteIfExists(Paths.get(path + File.separator + productEntity.getImage() + ".jpg"));
            imageService.uploadFile(path, productEntity.getImage() + ".jpg", file);
        }
        ProductEntity productSave = productEntityRepository.save(productEntity);

        String url = baseUrl + "/api/file/" + productSave.getImage() + ".jpg";

        ProductModel productModel = ProductModel.convert(productSave);
        productModel.setImage(url);
        return productModel;
    }

    public boolean deleteProduct(Long id) throws IOException {
        ProductEntity productEntity = productEntityRepository.findById(id).get();
        if (productEntity == null) {
            return false;
        } else {
            Files.deleteIfExists(Paths.get(path + File.separator + productEntity.getImage() + ".jpg"));
            productEntityRepository.delete(productEntity);
            return true;
        }

    }


}
