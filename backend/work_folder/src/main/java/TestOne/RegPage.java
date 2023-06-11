package TestOne;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

public class RegPage {

    public RegPage(WebDriver driver) {
        super();
        PageFactory.initElements(driver, this);
    }

    @FindBy(name = "firstName")
    private WebElement firstNameField;
    @FindBy(name = "lastName")
    private WebElement secondNameField;
    @FindBy(name = "location")
    private WebElement locationField;
    @FindBy(name = "occupation")
    private WebElement occupationField;
    @FindBy(name = "email")
    private WebElement emailField;
    @FindBy(name = "password")
    private WebElement passwordField;
    @FindBy(xpath = "//input[@type='file']")
    private WebElement pictureField;
    @FindBy(className = "MuiButton-fullWidth")
    private WebElement regButton;

    public void Register(String name, String surname, String location,
                         String occupation, String email, String password, String picture){
        firstNameField.sendKeys(name);
        secondNameField.sendKeys(surname);
        locationField.sendKeys(location);
        occupationField.sendKeys(occupation);
        emailField.sendKeys(email);
        passwordField.sendKeys(password);
        pictureField.sendKeys(picture);

        regButton.click();
    }

}
