There are json API Restful Service for sentiment analysis at moment.
# 1.Statistics of Tweets
## 1.1. Parameter: All
### Returns:
   1. Location: state_code and state_name;
   2. date: the date when analysis occurred;
   3. statistical data: num_tweets, num_retweets, num_likes, num_replies.
   
   Format shown in stas_loc_all.json:
  ```javascript
   {
      "state_code": "0",
      "state_name": "Whole Australia",
      "date_values": {
          "02/04/2020": {
              "num_tweets": 1420,
              "num_retweets": 2020,
              "num_likes": 14000,
              "num_replies": 300
            },
          "01/04/2020": {
              "num_tweets": 1420,
              "num_retweets": 2020,
              "num_likes": 14000,
              "num_replies": 300
          }
      }
    }
   ```
   
## 1.2. Parameter: Age or Gender
### Returns:
   1. Location: state_code and state_name;
   2. Date: the date when analysis occurred;
   3. Category: Age or Gender
   4. Statistical data: num_tweets, num_retweets, num_likes, num_replies.

   Format shown in stas_loc_age.json or stas_loc_gender.json:
  ```javascript
   {
      "state_code": "0",
      "state_name": "Whole Australia",
      "date_values": {
              "02/04/2020": [{
                "name": "Young",
                "values": {
                  "num_tweets": 1420,
                  "num_retweets": 2020,
                  "num_likes": 14000,
                  "num_replies": 300
                }
              }, {
                "name": "Middle",
                "values": {
                  "num_tweets": 1420,
                  "num_retweets": 2020,
                  "num_likes": 14000,
                  "num_replies": 300
                }
              }, {
                "name": "Older",
                "values": {
                  "num_tweets": 1420,
                  "num_retweets": 2020,
                  "num_likes": 14000,
                  "num_replies": 300
                }
              }],
        "01/04/2020": [{
                "name": "Young",
                "values": {
                  "num_tweets": 1420,
                  "num_retweets": 2020,
                  "num_likes": 14000,
                  "num_replies": 300
                }
              }, {
                "name": "Middle",
                "values": {
                  "num_tweets": 1420,
                  "num_retweets": 2020,
                  "num_likes": 14000,
                  "num_replies": 300
                }
              }, {
                "name": "Older",
                "values": {
                  "num_tweets": 1420,
                  "num_retweets": 2020,
                  "num_likes": 14000,
                  "num_replies": 300
                }
              }]
      }
    }
   ```
# 2. Statistics of Tweets with Sentiment
## 2.1. Parameter: All
### Returns:
   1. Location: state_code and state_name;
   2. date: the date when analysis occurred;
   3. statistical data:  "Positive", "Negative","Neutral", "num_tweets_pos",
                      "num_retweets_pos",
                      "num_likes_pos",
                      "num_replies_pos",
                      "num_tweets_neg",
                      "num_retweets_neg",
                      "num_likes_neg",
                      "num_replies_neg",
                      "num_tweets_neu",
                      "num_retweets_neu",
                      "num_likes_neu",
                      "num_replies_neu".
   
   Format shown in snt_bar_all.json:
  ```javascript
   {
      "state_code": "0",
      "state_name": "Whole Australia",
      "date_values": {
              "02/04/2020": {
                  "values": {
                      "Positive": 100,
                      "Negative": 70,
                      "Neural": 50
                  },
                  "stas_values": {
                      "num_tweets_pos": 100,
                      "num_retweets_pos": 202,
                      "num_likes_pos": 140,
                      "num_replies_pos": 30,
                      "num_tweets_neg": 70,
                      "num_retweets_neg": 20,
                      "num_likes_neg": 100,
                      "num_replies_neg": 20,
                      "num_tweets_neu": 50,
                      "num_retweets_neu": 30,
                      "num_likes_neu": 70,
                      "num_replies_neu": 40
                  }
                },
              "03/04/2020": {
                  "values": {
                      "Positive": 110,
                      "Negative": 120,
                      "Neural": 60
                  },
                  "stas_values": {
                      "num_tweets_pos": 110,
                      "num_retweets_pos": 202,
                      "num_likes_pos": 140,
                      "num_replies_pos": 30,
                      "num_tweets_neg": 120,
                      "num_retweets_neg": 20,
                      "num_likes_neg": 100,
                      "num_replies_neg": 20,
                      "num_tweets_neu": 60,
                      "num_retweets_neu": 30,
                      "num_likes_neu": 70,
                      "num_replies_neu": 40
                  }
              },
              "04/04/2020": {
                  "values": {
                      "Positive": 90,
                      "Negative": 60,
                      "Neural": 30
                  },
                  "stas_values": {
                      "num_tweets_pos": 90,
                      "num_retweets_pos": 202,
                      "num_likes_pos": 140,
                      "num_replies_pos": 30,
                      "num_tweets_neg": 60,
                      "num_retweets_neg": 20,
                      "num_likes_neg": 100,
                      "num_replies_neg": 20,
                      "num_tweets_neu": 30,
                      "num_retweets_neu": 30,
                      "num_likes_neu": 70,
                      "num_replies_neu": 40
                  }
              }
            }
    }
   ```
   
## 2.2. Parameter: Age or Gender
### Returns:
   1. Location: state_code and state_name;
   2. Date: the date when analysis occurred;
   3. Category: Age or Gender
   4. Statistical data: statistical data:  "Positive", "Negative","Neutral", "num_tweets_pos",
                      "num_retweets_pos",
                      "num_likes_pos",
                      "num_replies_pos",
                      "num_tweets_neg",
                      "num_retweets_neg",
                      "num_likes_neg",
                      "num_replies_neg",
                      "num_tweets_neu",
                      "num_retweets_neu",
                      "num_likes_neu",
                      "num_replies_neu".

   Format shown in snt_bar_age.json or snt_bar_gender.json:
  ```javascript
   {
      "state_code": "0",
      "state_name": "Whole Australia",
      "date_values": {
              "02/04/2020": [{
                "name": "Young",
                "values": {
                  "Positive": 100,
                  "Negative": 70,
                  "Neural": 50
                },
                "stas_values": {
                  "num_tweets_pos": 100,
                  "num_retweets_pos": 202,
                  "num_likes_pos": 140,
                  "num_replies_pos": 30,
                  "num_tweets_neg": 70,
                  "num_retweets_neg": 20,
                  "num_likes_neg": 100,
                  "num_replies_neg": 20,
                  "num_tweets_neu": 50,
                  "num_retweets_neu": 30,
                  "num_likes_neu": 70,
                  "num_replies_neu": 40
                }
              }, {
                "name": "Middle",
                "values": {
                  "Positive": 110,
                  "Negative": 120,
                  "Neural": 60
                },
                "stas_values": {
                  "num_tweets_pos": 110,
                  "num_retweets_pos": 202,
                  "num_likes_pos": 140,
                  "num_replies_pos": 30,
                  "num_tweets_neg": 120,
                  "num_retweets_neg": 20,
                  "num_likes_neg": 100,
                  "num_replies_neg": 20,
                  "num_tweets_neu": 60,
                  "num_retweets_neu": 30,
                  "num_likes_neu": 70,
                  "num_replies_neu": 40
                }
              }, {
                "name": "Older",
                "values": {
                  "Positive": 90,
                  "Negative": 60,
                  "Neural": 30
                },
                "stas_values": {
                  "num_tweets_pos": 90,
                  "num_retweets_pos": 202,
                  "num_likes_pos": 140,
                  "num_replies_pos": 30,
                  "num_tweets_neg": 60,
                  "num_retweets_neg": 20,
                  "num_likes_neg": 100,
                  "num_replies_neg": 20,
                  "num_tweets_neu": 30,
                  "num_retweets_neu": 30,
                  "num_likes_neu": 70,
                  "num_replies_neu": 40
                }
              }]
            }
    }
   ```

# 3. Bar Race data with Sentiment
## 3.1. Parameter: All
### Returns:
   1. Location: state_code and state_name;
   2. List: {"name": "Neutral", "value": 142, "year": 2020.9, "lastValue": 140, "rank": 3};
   3. "name" is sentiment (such as Positive, Negative or Neutral);"value" is the number 
   of tweets (or retweets, likes or replies); "year" is the date, "lastValue": the number of last date, 
   "rank" can be set to default 0.
   
   Format shown in snt_bar_race_all.json:
  ```javascript
   {
      "state_code": "0",
      "state_name": "Whole Australia",
      "value": [
            {
              "name": "Neutral",
              "value": 142,
              "year": 2020.9,
              "lastValue": 140,
              "rank": 3
            },
            {
              "name": "Neutral",
              "value": 140,
              "year": 2020.8,
              "lastValue": 137,
              "rank": 3
            },
            {
              "name": "Neutral",
              "value": 137,
              "year": 2020.7,
              "lastValue": 135,
              "rank": 3
            },
            {
              "name": "Neutral",
              "value": 135,
              "year": 2020.6,
              "lastValue": 132,
              "rank": 4
            },
            {
              "name": "Neutral",
              "value": 132,
              "year": 2020.5,
              "lastValue": 130,
              "rank": 4
            },
            {
              "name": "Neutral",
              "value": 130,
              "year": 2020.4,
              "lastValue": 127,
              "rank": 4
            },
            {
              "name": "Neutral",
              "value": 127,
              "year": 2020.3,
              "lastValue": 125,
              "rank": 4
            },
            {
              "name": "Neutral",
              "value": 125,
              "year": 2020.2,
              "lastValue": 122,
              "rank": 4
            },
            {
              "name": "Neutral",
              "value": 122,
              "year": 2020.1,
              "lastValue": 120,
              "rank": 5
            },
            {
              "name": "Neutral",
              "value": 120,
              "year": 2020.0,
              "lastValue": 120,
              "rank": 5
            },
            {
              "name": "Positive",
              "value": 211,
              "year": 2020.9,
              "lastValue": 208,
              "rank": 1
            },
            {
              "name": "Positive",
              "value": 208,
              "year": 2020.8,
              "lastValue": 205,
              "rank": 1
            },
            {
              "name": "Positive",
              "value": 205,
              "year": 2020.7,
              "lastValue": 202,
              "rank": 1
            },
            {
              "name": "Positive",
              "value": 202,
              "year": 2020.6,
              "lastValue": 199,
              "rank": 1
            },
            {
              "name": "Positive",
              "value": 199,
              "year": 2020.5,
              "lastValue": 196,
              "rank": 1
            },
            {
              "name": "Positive",
              "value": 196,
              "year": 2020.4,
              "lastValue": 193,
              "rank": 1
            },
            {
              "name": "Positive",
              "value": 193,
              "year": 2020.3,
              "lastValue": 190,
              "rank": 1
            },
            {
              "name": "Positive",
              "value": 190,
              "year": 2020.2,
              "lastValue": 187,
              "rank": 1
            },
            {
              "name": "Positive",
              "value": 187,
              "year": 2020.1,
              "lastValue": 184,
              "rank": 1
            },
            {
              "name": "Positive",
              "value": 184,
              "year": 2020.0,
              "lastValue": 184,
              "rank": 1
            },
            {
              "name": "Negative",
              "value": 154,
              "year": 2020.9,
              "lastValue": 152,
              "rank": 2
            },
            {
              "name": "Negative",
              "value": 152,
              "year": 2020.8,
              "lastValue": 151,
              "rank": 2
            },
            {
              "name": "Negative",
              "value": 151,
              "year": 2020.7,
              "lastValue": 149,
              "rank": 2
            },
            {
              "name": "Negative",
              "value": 149,
              "year": 2020.6,
              "lastValue": 148,
              "rank": 2
            },
            {
              "name": "Negative",
              "value": 148,
              "year": 2020.5,
              "lastValue": 147,
              "rank": 2
            },
            {
              "name": "Negative",
              "value": 147,
              "year": 2020.4,
              "lastValue": 145,
              "rank": 2
            },
            {
              "name": "Negative",
              "value": 145,
              "year": 2020.3,
              "lastValue": 144,
              "rank": 2
            },
            {
              "name": "Negative",
              "value": 144,
              "year": 2020.2,
              "lastValue": 143,
              "rank": 2
            },
            {
              "name": "Negative",
              "value": 143,
              "year": 2020.1,
              "lastValue": 141,
              "rank": 2
            },
            {
              "name": "Negative",
              "value": 141,
              "year": 2020.0,
              "lastValue": 141,
              "rank": 2
            }
          ]
    }
   ```
   
## 3.2. Parameter: Age or Gender
### Returns:
   1. Location: state_code and state_name;
   2. Category: Age or Gender
   3. List: {"name": "Neutral", "value": 142, "year": 2020.9, "lastValue": 140, "rank": 3};
   4. "name" is sentiment (such as Positive, Negative or Neutral);"value" is the number 
   of tweets (or retweets, likes or replies); "year" is the date, "lastValue": the number of last date, 
   "rank" can be set to default 0.

   Format shown in snt_bar_race_age.json or snt_bar_race_gender.json:
  ```javascript
   {
      "state_code": "0",
      "state_name": "Whole Australia",
      "groups": [
        {
          "group_name": "Young",
          "group_value": [
            {
              "name": "Neutral",
              "value": 142,
              "year": 2020.9,
              "lastValue": 140,
              "rank": 3
            },
            {
              "name": "Neutral",
              "value": 140,
              "year": 2020.8,
              "lastValue": 137,
              "rank": 3
            },
            {
              "name": "Neutral",
              "value": 137,
              "year": 2020.7,
              "lastValue": 135,
              "rank": 3
            },
            {
              "name": "Neutral",
              "value": 135,
              "year": 2020.6,
              "lastValue": 132,
              "rank": 4
            },
            {
              "name": "Neutral",
              "value": 132,
              "year": 2020.5,
              "lastValue": 130,
              "rank": 4
            },
            {
              "name": "Neutral",
              "value": 130,
              "year": 2020.4,
              "lastValue": 127,
              "rank": 4
            },
            {
              "name": "Neutral",
              "value": 127,
              "year": 2020.3,
              "lastValue": 125,
              "rank": 4
            },
            {
              "name": "Neutral",
              "value": 125,
              "year": 2020.2,
              "lastValue": 122,
              "rank": 4
            },
            {
              "name": "Neutral",
              "value": 122,
              "year": 2020.1,
              "lastValue": 120,
              "rank": 5
            },
            {
              "name": "Neutral",
              "value": 120,
              "year": 2020.0,
              "lastValue": 120,
              "rank": 5
            },
            {
              "name": "Positive",
              "value": 211,
              "year": 2020.9,
              "lastValue": 208,
              "rank": 1
            },
            {
              "name": "Positive",
              "value": 208,
              "year": 2020.8,
              "lastValue": 205,
              "rank": 1
            },
            {
              "name": "Positive",
              "value": 205,
              "year": 2020.7,
              "lastValue": 202,
              "rank": 1
            },
            {
              "name": "Positive",
              "value": 202,
              "year": 2020.6,
              "lastValue": 199,
              "rank": 1
            },
            {
              "name": "Positive",
              "value": 199,
              "year": 2020.5,
              "lastValue": 196,
              "rank": 1
            },
            {
              "name": "Positive",
              "value": 196,
              "year": 2020.4,
              "lastValue": 193,
              "rank": 1
            },
            {
              "name": "Positive",
              "value": 193,
              "year": 2020.3,
              "lastValue": 190,
              "rank": 1
            },
            {
              "name": "Positive",
              "value": 190,
              "year": 2020.2,
              "lastValue": 187,
              "rank": 1
            },
            {
              "name": "Positive",
              "value": 187,
              "year": 2020.1,
              "lastValue": 184,
              "rank": 1
            },
            {
              "name": "Positive",
              "value": 184,
              "year": 2020.0,
              "lastValue": 184,
              "rank": 1
            },
            {
              "name": "Negative",
              "value": 154,
              "year": 2020.9,
              "lastValue": 152,
              "rank": 2
            },
            {
              "name": "Negative",
              "value": 152,
              "year": 2020.8,
              "lastValue": 151,
              "rank": 2
            },
            {
              "name": "Negative",
              "value": 151,
              "year": 2020.7,
              "lastValue": 149,
              "rank": 2
            },
            {
              "name": "Negative",
              "value": 149,
              "year": 2020.6,
              "lastValue": 148,
              "rank": 2
            },
            {
              "name": "Negative",
              "value": 148,
              "year": 2020.5,
              "lastValue": 147,
              "rank": 2
            },
            {
              "name": "Negative",
              "value": 147,
              "year": 2020.4,
              "lastValue": 145,
              "rank": 2
            },
            {
              "name": "Negative",
              "value": 145,
              "year": 2020.3,
              "lastValue": 144,
              "rank": 2
            },
            {
              "name": "Negative",
              "value": 144,
              "year": 2020.2,
              "lastValue": 143,
              "rank": 2
            },
            {
              "name": "Negative",
              "value": 143,
              "year": 2020.1,
              "lastValue": 141,
              "rank": 2
            },
            {
              "name": "Negative",
              "value": 141,
              "year": 2020.0,
              "lastValue": 141,
              "rank": 2
            }
          ]
        },
        {
          "group_name": "Middle",
          "group_value": [
            {
              "name": "Neutral",
              "value": 142,
              "year": 2020.9,
              "lastValue": 140,
              "rank": 3
            },
            {
              "name": "Neutral",
              "value": 140,
              "year": 2020.8,
              "lastValue": 137,
              "rank": 3
            },
            {
              "name": "Neutral",
              "value": 137,
              "year": 2020.7,
              "lastValue": 135,
              "rank": 3
            },
            {
              "name": "Neutral",
              "value": 135,
              "year": 2020.6,
              "lastValue": 132,
              "rank": 4
            },
            {
              "name": "Neutral",
              "value": 132,
              "year": 2020.5,
              "lastValue": 130,
              "rank": 4
            },
            {
              "name": "Neutral",
              "value": 130,
              "year": 2020.4,
              "lastValue": 127,
              "rank": 4
            },
            {
              "name": "Neutral",
              "value": 127,
              "year": 2020.3,
              "lastValue": 125,
              "rank": 4
            },
            {
              "name": "Neutral",
              "value": 125,
              "year": 2020.2,
              "lastValue": 122,
              "rank": 4
            },
            {
              "name": "Neutral",
              "value": 122,
              "year": 2020.1,
              "lastValue": 120,
              "rank": 5
            },
            {
              "name": "Neutral",
              "value": 120,
              "year": 2020.0,
              "lastValue": 120,
              "rank": 5
            },
            {
              "name": "Positive",
              "value": 211,
              "year": 2020.9,
              "lastValue": 208,
              "rank": 1
            },
            {
              "name": "Positive",
              "value": 208,
              "year": 2020.8,
              "lastValue": 205,
              "rank": 1
            },
            {
              "name": "Positive",
              "value": 205,
              "year": 2020.7,
              "lastValue": 202,
              "rank": 1
            },
            {
              "name": "Positive",
              "value": 202,
              "year": 2020.6,
              "lastValue": 199,
              "rank": 1
            },
            {
              "name": "Positive",
              "value": 199,
              "year": 2020.5,
              "lastValue": 196,
              "rank": 1
            },
            {
              "name": "Positive",
              "value": 196,
              "year": 2020.4,
              "lastValue": 193,
              "rank": 1
            },
            {
              "name": "Positive",
              "value": 193,
              "year": 2020.3,
              "lastValue": 190,
              "rank": 1
            },
            {
              "name": "Positive",
              "value": 190,
              "year": 2020.2,
              "lastValue": 187,
              "rank": 1
            },
            {
              "name": "Positive",
              "value": 187,
              "year": 2020.1,
              "lastValue": 184,
              "rank": 1
            },
            {
              "name": "Positive",
              "value": 184,
              "year": 2020.0,
              "lastValue": 184,
              "rank": 1
            },
            {
              "name": "Negative",
              "value": 154,
              "year": 2020.9,
              "lastValue": 152,
              "rank": 2
            },
            {
              "name": "Negative",
              "value": 152,
              "year": 2020.8,
              "lastValue": 151,
              "rank": 2
            },
            {
              "name": "Negative",
              "value": 151,
              "year": 2020.7,
              "lastValue": 149,
              "rank": 2
            },
            {
              "name": "Negative",
              "value": 149,
              "year": 2020.6,
              "lastValue": 148,
              "rank": 2
            },
            {
              "name": "Negative",
              "value": 148,
              "year": 2020.5,
              "lastValue": 147,
              "rank": 2
            },
            {
              "name": "Negative",
              "value": 147,
              "year": 2020.4,
              "lastValue": 145,
              "rank": 2
            },
            {
              "name": "Negative",
              "value": 145,
              "year": 2020.3,
              "lastValue": 144,
              "rank": 2
            },
            {
              "name": "Negative",
              "value": 144,
              "year": 2020.2,
              "lastValue": 143,
              "rank": 2
            },
            {
              "name": "Negative",
              "value": 143,
              "year": 2020.1,
              "lastValue": 141,
              "rank": 2
            },
            {
              "name": "Negative",
              "value": 141,
              "year": 2020.0,
              "lastValue": 141,
              "rank": 2
            }
          ]
        },
        {
          "group_name": "Older",
          "group_value": [
            {
              "name": "Neutral",
              "value": 142,
              "year": 2020.9,
              "lastValue": 140,
              "rank": 3
            },
            {
              "name": "Neutral",
              "value": 140,
              "year": 2020.8,
              "lastValue": 137,
              "rank": 3
            },
            {
              "name": "Neutral",
              "value": 137,
              "year": 2020.7,
              "lastValue": 135,
              "rank": 3
            },
            {
              "name": "Neutral",
              "value": 135,
              "year": 2020.6,
              "lastValue": 132,
              "rank": 4
            },
            {
              "name": "Neutral",
              "value": 132,
              "year": 2020.5,
              "lastValue": 130,
              "rank": 4
            },
            {
              "name": "Neutral",
              "value": 130,
              "year": 2020.4,
              "lastValue": 127,
              "rank": 4
            },
            {
              "name": "Neutral",
              "value": 127,
              "year": 2020.3,
              "lastValue": 125,
              "rank": 4
            },
            {
              "name": "Neutral",
              "value": 125,
              "year": 2020.2,
              "lastValue": 122,
              "rank": 4
            },
            {
              "name": "Neutral",
              "value": 122,
              "year": 2020.1,
              "lastValue": 120,
              "rank": 5
            },
            {
              "name": "Neutral",
              "value": 120,
              "year": 2020.0,
              "lastValue": 120,
              "rank": 5
            },
            {
              "name": "Positive",
              "value": 211,
              "year": 2020.9,
              "lastValue": 208,
              "rank": 1
            },
            {
              "name": "Positive",
              "value": 208,
              "year": 2020.8,
              "lastValue": 205,
              "rank": 1
            },
            {
              "name": "Positive",
              "value": 205,
              "year": 2020.7,
              "lastValue": 202,
              "rank": 1
            },
            {
              "name": "Positive",
              "value": 202,
              "year": 2020.6,
              "lastValue": 199,
              "rank": 1
            },
            {
              "name": "Positive",
              "value": 199,
              "year": 2020.5,
              "lastValue": 196,
              "rank": 1
            },
            {
              "name": "Positive",
              "value": 196,
              "year": 2020.4,
              "lastValue": 193,
              "rank": 1
            },
            {
              "name": "Positive",
              "value": 193,
              "year": 2020.3,
              "lastValue": 190,
              "rank": 1
            },
            {
              "name": "Positive",
              "value": 190,
              "year": 2020.2,
              "lastValue": 187,
              "rank": 1
            },
            {
              "name": "Positive",
              "value": 187,
              "year": 2020.1,
              "lastValue": 184,
              "rank": 1
            },
            {
              "name": "Positive",
              "value": 184,
              "year": 2020.0,
              "lastValue": 184,
              "rank": 1
            },
            {
              "name": "Negative",
              "value": 154,
              "year": 2020.9,
              "lastValue": 152,
              "rank": 2
            },
            {
              "name": "Negative",
              "value": 152,
              "year": 2020.8,
              "lastValue": 151,
              "rank": 2
            },
            {
              "name": "Negative",
              "value": 151,
              "year": 2020.7,
              "lastValue": 149,
              "rank": 2
            },
            {
              "name": "Negative",
              "value": 149,
              "year": 2020.6,
              "lastValue": 148,
              "rank": 2
            },
            {
              "name": "Negative",
              "value": 148,
              "year": 2020.5,
              "lastValue": 147,
              "rank": 2
            },
            {
              "name": "Negative",
              "value": 147,
              "year": 2020.4,
              "lastValue": 145,
              "rank": 2
            },
            {
              "name": "Negative",
              "value": 145,
              "year": 2020.3,
              "lastValue": 144,
              "rank": 2
            },
            {
              "name": "Negative",
              "value": 144,
              "year": 2020.2,
              "lastValue": 143,
              "rank": 2
            },
            {
              "name": "Negative",
              "value": 143,
              "year": 2020.1,
              "lastValue": 141,
              "rank": 2
            },
            {
              "name": "Negative",
              "value": 141,
              "year": 2020.0,
              "lastValue": 141,
              "rank": 2
            }
          ]
        }
      ]
    }
   ```
