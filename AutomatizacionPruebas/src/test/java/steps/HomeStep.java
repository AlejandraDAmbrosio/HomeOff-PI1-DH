package steps;

import net.serenitybdd.core.pages.PageObject;
import net.thucydides.core.annotations.Step;

public class HomeStep extends PageObject {

    @Step
    public void abrirUrl() throws InterruptedException {
        openUrl("https://maquillajetrendyshop.com/");
        Thread.sleep(5000);
    }
}
