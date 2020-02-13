package com.lf.codeonline.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
//RestController相当于SpringMVC中的@Controller+@ResponseBody
@RestController
public class HelloController {
    @RequestMapping("/hello")
    public String Hello(){
        return "Hello IDEA SpringBoot!";
    }
}
