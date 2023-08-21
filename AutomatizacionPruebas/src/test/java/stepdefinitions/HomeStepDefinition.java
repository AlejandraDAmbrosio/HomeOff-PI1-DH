package stepdefinitions;

import steps.HomeStep;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import net.thucydides.core.annotations.Steps;

public class HomeStepDefinition {
    @Steps
    HomeStep homeStep;
    @Given("Que se tiene acceso al aplicativo web")
    public void que_se_tiene_acceso_al_aplicativo_web() throws InterruptedException {
        homeStep.abrirUrl();
    }
    @When("Ingrese al url")
    public void ingrese_al_url() {
        throw new io.cucumber.java.PendingException();
    }
    @Then("Sera direccionado al home de HomeOff")
    public void sera_direccionado_al_home_de_home_off() {
        throw new io.cucumber.java.PendingException();
    }
}
