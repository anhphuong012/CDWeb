package com.example.webbanhang.service;

import java.io.FileNotFoundException;
import java.io.InputStream;

public interface IFileService {
	InputStream getResourceFile(String path, String name) throws FileNotFoundException;
}
