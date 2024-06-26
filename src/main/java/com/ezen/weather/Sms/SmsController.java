package com.ezen.weather.Sms;

import com.ezen.weather.adminTemp.AdminTempRepository;
import com.ezen.weather.user.SiteUser;
import com.ezen.weather.user.UserRepository;
import com.ezen.weather.user.UserService;
import com.ezen.weather.userTemp.UserTempRepository;
import com.ezen.weather.userTemp.UserTempService;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import net.nurigo.sdk.NurigoApp;
import net.nurigo.sdk.message.model.Message;
import net.nurigo.sdk.message.request.SingleMessageSendingRequest;
import net.nurigo.sdk.message.response.SingleMessageSentResponse;
import net.nurigo.sdk.message.service.DefaultMessageService;
import org.apache.maven.model.Site;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RequiredArgsConstructor
@RestController
public class SmsController {

    private final DefaultMessageService messageService = NurigoApp.INSTANCE.initialize("NCSZ8XWZKKRP9KKN", "JMPSLYI9E3BNNLB3Y7OJQ9ZWFXZFRXBD", "https://api.coolsms.co.kr");

    private final AdminTempRepository adminTempRepository;
    private final UserRepository userRepository;
    private final UserTempRepository userTempRepository;
    private final UserTempService userTempService;


    @PostMapping("/user/send")
    public void sendSms(@RequestBody Map<String, Object> data) {
        String userId = (String)data.get("userId");
        Object obj = data.get("value");
        System.out.println("Controller~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
        System.out.println(obj);
        System.out.println(userId);

        double userMaxTemp = userTempService.getUserTemp(userId).getUserSetMaxTemp();
        double userMinTemp = userTempService.getUserTemp(userId).getUserSetMinTemp();
        Integer userRain = userTempService.getUserTemp(userId).getUserSetRain();

        // 비오는건 아직 구현 못함
        if(userMaxTemp <= Double.parseDouble(obj.toString())) {
            Message message = new Message();
            message.setFrom("01020751709");
            message.setTo("01040562408");
            message.setText("폭염에 주의하세요");

            SingleMessageSentResponse response = this.messageService.sendOne(new SingleMessageSendingRequest(message));
        }


        System.out.println("데이터베이스에 저장된 최대 값 : " +userMaxTemp+"\n"+"최소값 : " + userMinTemp + "\n" +"비 :" + userRain);
        System.out.println("호출  " + "유저아이디 : " + userId + "  온도 값 : " +obj);

    }


}
