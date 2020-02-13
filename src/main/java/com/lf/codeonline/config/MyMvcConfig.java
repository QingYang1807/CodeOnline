package com.lf.codeonline.config;

import com.lf.codeonline.component.MyLoacleResolver;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.LocaleResolver;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@Configuration
public class MyMvcConfig extends WebMvcConfigurerAdapter {
    @Bean
    public LocaleResolver localeResolver(){
        return new MyLoacleResolver();
    }
}
