package steps;

import net.serenitybdd.core.pages.PageObject;
import net.thucydides.core.annotations.Step;

public class HomeStep extends PageObject {

    @Step
    public void abrirUrl() throws InterruptedException {
        openUrl("http://127.0.0.1:5173/");
        Thread.sleep(5000);
    }
}
