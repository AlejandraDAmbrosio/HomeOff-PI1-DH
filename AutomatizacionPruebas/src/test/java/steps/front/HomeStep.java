package steps.front;

import net.serenitybdd.core.pages.PageObject;
import net.thucydides.core.annotations.Step;
import pagesobject.front.home.HomePage;

import static net.thucydides.core.environment.SystemEnvironmentVariables.createEnvironmentVariables;

public class HomeStep extends PageObject {

    HomePage homePage;

    @Step
    public void abrirUrl() throws InterruptedException {
        String environment = createEnvironmentVariables().getProperty("environment");

        if (environment.equals("local2")) {
            openUrl("http://127.0.0.1:5173/");
            Thread.sleep(5000);

        } else if (environment.equals("local3")) {
            openUrl("http://homeoff-prod-fe.s3-website-us-west-2.amazonaws.com/");
            Thread.sleep(5000);

        }
    }

    @Step
    public void validacionLogo() throws InterruptedException {
        homePage.validacionLogo();
    }

    @Step
    public void validacionHome() throws InterruptedException {
        homePage.validacionHome();
    }
}
