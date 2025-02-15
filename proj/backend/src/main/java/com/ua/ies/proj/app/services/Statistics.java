package com.ua.ies.proj.app.services;

import java.time.Instant;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Stream;

import org.springframework.stereotype.Service;

import com.ua.ies.proj.app.models.FoodchainInfo;
import com.ua.ies.proj.app.models.MenuInfo;
import com.ua.ies.proj.app.models.OrderStatisticsDTO;

@Service
public class Statistics {
    private int LIMIT;

    public Statistics() {
        this.LIMIT = 5;
    }

    public void setLIMIT(int LIMIT) {
        this.LIMIT = LIMIT;
    }

    public int getLIMIT() {
        return LIMIT;
    }

    public Map<String, OrderStatisticsDTO> processOrderDataMenu(List<Object[]> results) {
        if (results.isEmpty()) {
            return new HashMap<>();
        }


        Map<String, OrderStatisticsDTO> orderStatistics = new HashMap<>();
        results.forEach(row -> {
            String menuName = (String) row[0];
            if (!orderStatistics.containsKey(menuName)) {
                Long id = (Long) row[1];
                double price = (double) row[2];
                MenuInfo menu_info = new MenuInfo(id, menuName, price);
                OrderStatisticsDTO orderStat = new OrderStatisticsDTO(menu_info, new ArrayList<>(Arrays.asList(0, 0, 0, 0, 0, 0)));
                orderStatistics.put(menuName, orderStat);
            }

        });

        for (Object[] row : results) {
            String menuName = (String) row[0];
            Long id = (Long) row[1];
            double price = (double) row[2];
            MenuInfo menu_info = new MenuInfo(id, menuName, price);
            Date bucket = Date.from((Instant) row[3]);
            Integer orderCount = ((Number) row[4]).intValue();

            OrderStatisticsDTO orderStat = orderStatistics.get(menuName);
            List<Integer> values = orderStat.getValues();
            int minuteIndex = calculateMinuteIndex(bucket);
            values.set(minuteIndex, orderCount);
            OrderStatisticsDTO newOrderStat = new OrderStatisticsDTO(menu_info, values);
            orderStatistics.put(menuName, newOrderStat);
        }
        
        return filterTopStatisticByNow(orderStatistics);
    }

    public Map<String, OrderStatisticsDTO> processOrderDataFoodChain(List<Object[]> results){
        if (results.isEmpty()) {
            return new HashMap<>();
        }

        Map<String, OrderStatisticsDTO> orderStatistics = new HashMap<>();

        for (Object[] row : results) {
            String foodChainName = (String) row[0];
            if (!orderStatistics.containsKey(foodChainName)) {
                Long id = (Long) row[1];
                FoodchainInfo foodChain_info = new FoodchainInfo(id, foodChainName);
                OrderStatisticsDTO orderStat = new OrderStatisticsDTO(foodChain_info, new ArrayList<>(Arrays.asList(0, 0, 0, 0, 0, 0)));
                orderStatistics.put(foodChainName, orderStat);
            }
        }

        for (Object[] row : results) {
            String foodChainName = (String) row[0];
            Long id = (Long) row[1];
            FoodchainInfo foodChain_info = new FoodchainInfo(id, foodChainName);
            Date bucket = Date.from((Instant) row[2]);
            Integer orderCount = ((Number) row[3]).intValue();

            OrderStatisticsDTO orderStat = orderStatistics.get(foodChainName);
            List<Integer> values = orderStat.getValues();
            int minuteIndex = calculateMinuteIndex(bucket);
            values.set(minuteIndex, orderCount);
            OrderStatisticsDTO newOrderStat = new OrderStatisticsDTO(foodChain_info, values);
            orderStatistics.put(foodChainName, newOrderStat);
        }

        return filterTopStatisticByNow(orderStatistics);
    }

    private int calculateMinuteIndex(Date bucket) {
        long minutesAgo = (new Date().getTime() - bucket.getTime()) / (60 * 1000);
        return (int) (5 - minutesAgo);
    }

    public Map<String, OrderStatisticsDTO> filterTopStatisticByNow(Map<String, OrderStatisticsDTO> orderStatistics) {
        Stream<Map.Entry<String, OrderStatisticsDTO>> stream = orderStatistics.entrySet().stream()
            .sorted((e1, e2) -> Integer.compare(
                e2.getValue().getValues().get(4),
                e1.getValue().getValues().get(4)));

        if (LIMIT != -1) {
            stream = stream.limit(LIMIT);
        }

        return stream.collect(HashMap::new, (m, e) -> m.put(e.getKey(), e.getValue()), HashMap::putAll);
    }
}



