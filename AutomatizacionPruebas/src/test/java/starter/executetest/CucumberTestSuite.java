package starter.executetest;
import io.cucumber.junit.CucumberOptions;
import net.serenitybdd.cucumber.CucumberWithSerenity;
import org.junit.runner.RunWith;
@RunWith(CucumberWithSerenity.class)
@CucumberOptions(
        features = "src/test/resources/features",
        plugin = {"json:target/destination/cucumber.json"},
        glue = "stepdefinitions",
        tags = "@Regresion"
)
public class  CucumberTestSuite {
}
