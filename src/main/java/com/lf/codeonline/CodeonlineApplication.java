package com.lf.codeonline;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
//SpringBootApplication是组合注解，相当于：@Configuration+@EnableAutoConfiguration+@ComponentScan
@SpringBootApplication(exclude = DataSourceAutoConfiguration.class)
public class CodeonlineApplication {

    public static void main(String[] args) {
        SpringApplication.run(CodeonlineApplication.class, args);
    }

}
