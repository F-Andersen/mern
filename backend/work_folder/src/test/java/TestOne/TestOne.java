package TestOne;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.testng.annotations.AfterClass;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;

import java.io.IOException;

public class TestOne {
    WebDriver driver;
    RegPage registationPage;
    SignInPage signInPages;
    Screenshots screenshots;
    private String site = "http://localhost:3000";

    @BeforeClass
    public void initDriver(){
        ChromeOptions options = new ChromeOptions();
        options.addArguments("--remote-allow-origins=*");
        System.setProperty("webdriver.chrome.driver", "src/main/resources/chromedriver.exe");
        System.setProperty("webdriver.http.factory", "jdk-http-client");
        driver = new ChromeDriver(options);
        driver.manage().window().maximize();
    }

    @Test
    public void RegistrationUser(){
        String firstname = "User", secondname = "Userich", loc= "Mongoliya", occupation = "I dont now what i mean", picture = "C:/src/main/resources/example.png";
        String email = "User@gmail.com", password = "UserA123";
        driver.get(site);
        signInPages = new SignInPage(driver);
        signInPages.redirectReg();

        registationPage = new RegPage(driver);
        registationPage.Register(firstname, secondname,loc, occupation,email,password,picture);

    }

    @Test
    public void LogInUser() throws IOException, InterruptedException {
        String email = "User@gmail.com", password = "UserA123", screenshotName = "main";
        driver.get(site);
        signInPages = new SignInPage(driver);
        signInPages.signIn(email,password);

        screenshots = new Screenshots();
        screenshots.screenshotes(driver, screenshotName);
    }

    @AfterClass
    public void endTest(){
        driver.quit();
    }
}
