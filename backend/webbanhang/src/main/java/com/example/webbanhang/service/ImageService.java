package com.example.webbanhang.service;


import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.InputStream;

import org.springframework.stereotype.Service;

@Service
public class ImageService implements IFileService {

	@Override
	public InputStream getResourceFile(String path, String name) throws FileNotFoundException {
		String filePath = path + File.separator + name;
		return new FileInputStream(filePath);
	}

}
