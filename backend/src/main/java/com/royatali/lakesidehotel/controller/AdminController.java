package com.royatali.lakesidehotel.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/admin")
@RestController
public class AdminController {

   @GetMapping("/getAdminRoutes")
   @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Boolean> getAdminRoutes(){
       return ResponseEntity.ok(true);
   }
}
