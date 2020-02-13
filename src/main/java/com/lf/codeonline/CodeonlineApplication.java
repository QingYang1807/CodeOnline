package com.lf.codeonline;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.data.redis.RedisAutoConfiguration;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
//SpringBootApplication是组合注解，相当于：@Configuration+@EnableAutoConfiguration+@ComponentScan
//关闭Redis自动配置@SpringBootApplication(exclude = RedisAutoConfiguration.class)
//关闭多个用{ , , , , }@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class, RedisAutoConfiguration.class})
@SpringBootApplication(exclude = DataSourceAutoConfiguration.class)
public class CodeonlineApplication {

    public static void main(String[] args) {
        SpringApplication.run(CodeonlineApplication.class, args);
    }

}
