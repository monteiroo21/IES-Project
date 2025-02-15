package com.ua.ies.proj.app.models;

import java.util.List;

import org.springframework.stereotype.Component;

@Component
public class OrderStatisticsDTO {
    private Info info;
    private List<Integer> values;

    public OrderStatisticsDTO() {
    }

    public OrderStatisticsDTO(Info info, List<Integer> values) {
        this.info = info;
        this.values = values;
    }

    public Info getInfo() {
        return info;
    }

    public void setInfo(Info info) {
        this.info = info;
    }

    public List<Integer> getValues() {
        return values;
    }

    public void setValues(List<Integer> values) {
        this.values = values;
    }
}