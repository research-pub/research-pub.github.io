## Original daily statistical data
1. positive: number of daily positive posts;
2. negative: number of daily negative posts;
3. neutral: number of daily neutral posts;
4. aus_users: number of daily all Australian users using Twitter (Currently we don't know);
5. ref_users: number of daily Australian users who talking about tracing app, 
(if hard to get the number, can be the count that Australian users involve the topic of tracing app).

## Aggregating daily statistical data
1. perc_positive: the percentage of daily positive posts out of all daily posts, (positive/ (positive+negative+neutral));
2. perc_negative: the percentage of daily negative posts out of all daily posts, (negative/ (positive+negative+neutral));
3. perc_neutral: the percentage of daily neutral posts out of all daily posts, (neutral/ (positive+negative+neutral));

## Accumulative statistical data
```
if current date is the first date, then the accumulative number equals the current crespoding number
    acc_positive = positive
    acc_negative = negative
    acc_neutral = neutral
    acc_aus_users = aus_users
    acc_ref_users = ref_users
   
else, the accumulative number equals last date's accumulative number plus the current crespoding number
    last_day_data = lastDate()
    acc_positive = last_day_data.acc_positive + positive
    acc_negative = last_day_data.acc_negative + negative
    acc_neutral = last_day_data.acc_neutral + neutral
    acc_aus_users = last_day_data.acc_aus_users + aus_users
    acc_ref_users = last_day_data.acc_ref_users + ref_users
```
