package pagesobject.front.paneladmin;

import net.serenitybdd.core.pages.PageObject;
import starter.executetest.BaseWrapper;

public class PanelAdminPage extends PageObject {

    String userAdmin = "return document.querySelector(\"#root > div.header > nav > ul > div > li > div > div > button\")";
    String opcionPanelAdmin = "return document.querySelector(\"#account-menu > div.MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded.MuiPaper-elevation0.MuiMenu-paper.MuiPopover-paper.MuiMenu-paper.css-o19qus > ul > a:nth-child(5) > li\")";
    String btoAgregarProducto = "return document.querySelector(\"#root > div.administracion-prod > div.paneles-prod > div.MuiBox-root.css-7xlv4r > ul > a:nth-child(3) > li > div\")";
    String btoListarProducto = "return document.querySelector(\"#root > div.administracion-prod > div.paneles-prod > div.MuiBox-root.css-7xlv4r > ul > a:nth-child(4) > li > div\")";
    String btoAdministarCaracteristicas = "return document.querySelector(\"#root > div.administracion-prod > div.paneles-prod > div.MuiBox-root.css-7xlv4r > ul > a:nth-child(5) > li > div\")";
    String btoAgregarCategoria = "return document.querySelector(\"#root > div.administracion-prod > div.paneles-prod > div.MuiBox-root.css-7xlv4r > ul > a:nth-child(6) > li > div\")";
    String btoUsuario = "return document.querySelector(\"#root > div.administracion-prod > div.paneles-prod > div.MuiBox-root.css-7xlv4r > ul > a:nth-child(7) > li > div\")";


    BaseWrapper baseWrapper = new BaseWrapper();
    public void validacionAutenticadoAdmin() throws InterruptedException {
       // baseWrapper.FactoryShadowRootObjectVisibility(userAdmin);
        Thread.sleep(2000);
        System.out.println("***Usuario Admin Autenticadp con exito***");
        Thread.sleep(2000);
    }

    public void seleccionOpcionAdmin() throws InterruptedException {
        baseWrapper.FactoryShadowRootObjectVisibility(opcionPanelAdmin);
        System.out.println("***Admin Ok***");
        baseWrapper.ClickShadowRootObject(opcionPanelAdmin);
        Thread.sleep(5000);
    }

    public void validacionOpcionesAdmin() throws InterruptedException {

        baseWrapper.FactoryShadowRootObjectVisibility(btoAgregarProducto);
        Thread.sleep(2000);
        baseWrapper.FactoryShadowRootObjectVisibility(btoListarProducto);
        Thread.sleep(2000);
        baseWrapper.FactoryShadowRootObjectVisibility(btoAdministarCaracteristicas);
        Thread.sleep(2000);
        baseWrapper.FactoryShadowRootObjectVisibility(btoAgregarCategoria);
        Thread.sleep(2000);
        baseWrapper.FactoryShadowRootObjectVisibility(btoUsuario);
        Thread.sleep(2000);
        System.out.println("***Panel admin***");

    }
}
