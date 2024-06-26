package com.ezen.weather.userTemp;

import com.ezen.weather.user.SiteUser;
import com.ezen.weather.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class UserTempService {

    private final UserTempRepository userTempRepository;
    private final UserRepository userRepository;

    public void input(String hiddenMaxTemp, String hiddenMinTemp, Boolean rain, String hiddenUserId) {

        Double hiddenMaxTempDouble = Double.parseDouble(hiddenMaxTemp);
        Double hiddenMinTempDouble = Double.parseDouble(hiddenMinTemp);
        SiteUser siteUser = userRepository.findById(hiddenUserId).get();

        // UserTemp 를 SiteUser 를 기준으로 조회한다.
        // 테이블에 id 값이 있으면 새로 데이터베이스에 행을 추가하는것이아닌 기존 값이 업데이트된다.
        UserTemp userTemp = userTempRepository.findBySiteUser(siteUser).orElse(new UserTemp());

        userTemp.setUserSetMaxTemp(hiddenMaxTempDouble);
        userTemp.setUserSetMinTemp(hiddenMinTempDouble);
        userTemp.setUserSetRain(rain ? 1 : 0); // Boolean 값을 0또는 1로 매핑한다.
        userTemp.setSiteUser(siteUser);

        userTempRepository.save(userTemp);
    }


    public UserTemp getUserTemp(String userId){
        SiteUser siteUser = userRepository.findById(userId).get();

        return userTempRepository.findBySiteUser(siteUser).orElse(null);
    }
}
