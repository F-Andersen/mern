package TestOne;
import org.apache.commons.io.FileUtils;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;
import org.openqa.selenium.WebDriver;

import java.io.File;
import java.io.IOException;

public class Screenshots {

    public void screenshotes(WebDriver driver, String nameScreen) throws IOException, InterruptedException {
        Thread.sleep(3000);
        TakesScreenshot screenshot = (TakesScreenshot) driver;
        File srcFile = screenshot.getScreenshotAs(OutputType.FILE);
        String filePath = "C:/src/tss/work_2/screenshotes" + nameScreen;
        FileUtils.copyFile(srcFile, new File(filePath));

    }
}
