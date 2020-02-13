package com.lf.codeonline.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class IndexController {
    @RequestMapping("/")
    public String index(Model model){
        System.out.println("IndexController index方法被调用...");
        return "index";
    }
    @RequestMapping("/login")
    public String login(Model model){
        System.out.println("IndexController login方法被调用...");
        return "login";
    }
    @RequestMapping("/regist")
    public String regist(Model model){
        System.out.println("IndexController regist方法被调用...");
        return "regist";
    }
}
