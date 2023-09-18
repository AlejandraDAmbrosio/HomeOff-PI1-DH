package steps;

import net.serenitybdd.core.pages.PageObject;
import net.thucydides.core.annotations.Step;
import pagesobject.front.home.HomePage;

public class HomeStep extends PageObject {

    HomePage homePage;
    @Step
    public void abrirUrl() throws InterruptedException {
        openUrl("http://127.0.0.1:5173/");
        Thread.sleep(5000);
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
