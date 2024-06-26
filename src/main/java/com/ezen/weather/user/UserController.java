package com.ezen.weather.user;

import com.ezen.weather.adminTemp.AdminTemp;
import com.ezen.weather.adminTemp.AdminTempService;
import com.ezen.weather.userTemp.UserTemp;
import com.ezen.weather.userTemp.UserTempService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@Controller
@RequestMapping("/user")
public class UserController {

    private final UserService userService;
    private final AdminTempService adminTempService;
    private final UserTempService userTempService;
    private final UserRepository userRepository;

    @GetMapping("/signup")
    public String signup(Model model){
        model.addAttribute("siteUser", new SiteUser());
        return "signup_form";
    }

    @PostMapping("/signup")
    public String signup(@ModelAttribute SiteUser siteUser, Model model){

        userService.create(siteUser.getUserId(), siteUser.getPassword(), siteUser.getName(), siteUser.getPhone(), siteUser.getAddressStreet(), siteUser.getAddressZipcode(), siteUser.getAddressDetail(), siteUser.getAddressNotes(), siteUser.getEmail(), siteUser.getBirth());
        return "redirect:/";
    }
    // 아이디 중복 검사
    @GetMapping("/checkUserId")
    public ResponseEntity<?> checkUserIdAvailability(@RequestParam("userId") String userId){
        boolean available = !userService.isUserIdExists(userId);

        return ResponseEntity.ok().body(Collections.singletonMap("available", available));

    }

    @GetMapping("/checkUserEmail")
    public ResponseEntity<?> checkUserEmailAvailability(@RequestParam("email") String email){
        System.out.println("Controller~~~~~~~~~~~");
        boolean available = !userService.isUserEmailExists(email);
        return ResponseEntity.ok().body(Collections.singletonMap("available", available));
    }

    @GetMapping("/login")
    public String login(Model model){
        model.addAttribute("siteUser", new SiteUser());
        return "login_form";
    }

    @GetMapping("/mypage")
    public String mypage(@AuthenticationPrincipal UserDetails userDetails, Model model){
        String userId = userDetails.getUsername();
        UserTemp userTemp = userTempService.getUserTemp(userId);
        List<AdminTemp> adminTemps = adminTempService.getAllAdminTemps();


        model.addAttribute("userTemp", userTemp);
        model.addAttribute("adminTemps", adminTemps);
        return "user_mypage";

    }
    @PostMapping("/userTempSet")
    public String userTempSet(@RequestParam("hiddenMaxTemp") String hiddenMaxTemp,
                              @RequestParam("hiddenMinTemp") String hiddenMinTemp,
                              @RequestParam(value="rain", defaultValue = "false") boolean rain,
                              @RequestParam("hiddenUserId") String hiddenUserId){
        System.out.println(rain);
        System.out.println(hiddenUserId);


        userTempService.input(hiddenMaxTemp, hiddenMinTemp, rain, hiddenUserId);


        return "redirect:/";
    }


}
