package com.ziglog.ziglog.global.auth.util;

import java.util.Random;

public class NicknameGenerator {

    private static String []adverbs = { "매우", "엄청", "조금은", "상당히", "너무나", "약간", "살짝", "강하게", "약하게", "꽤", "안", "긍정적으로", "즐겁게", "동쪽의", "서쪽의", "남쪽의", "북쪽의"};
    private static String []adjectives = { "배고픈", "빠른", "슬픈", "기쁜", "웃는", "울부짖는", "아리따운", "귀여운", "행복한", "절망하는", "눈물흘리는", "달리는", "굶주린", "먹는", "열망하는", "추앙하는", "못생긴", "거대한", "조그만"};
    private static String []nouns= { "다람쥐", "멍멍이", "야옹이", "토끼", "코끼리", "무당벌레", "개구리", "영서", "하늘", "성용", "수형", "정민", "현아", "낙타", "수달", "알파카"};
    private static final Random random = new Random();

    public static String generateRandomNickname(){
        String adverb = adverbs[random.nextInt(adverbs.length)];
        String adjective = adjectives[random.nextInt(adjectives.length)];
        String noun = nouns[random.nextInt(nouns.length)];
        int randomNumber = random.nextInt(9000) + 1000;

        return adverb + adjective + noun + randomNumber;
    }
}
