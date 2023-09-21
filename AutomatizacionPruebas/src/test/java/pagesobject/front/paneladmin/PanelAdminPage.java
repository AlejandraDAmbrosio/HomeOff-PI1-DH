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
        baseWrapper.FactoryShadowRootObjectVisibility(userAdmin);
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

    public void ValidacionAdmin() throws InterruptedException {
        String cajaOpcionesAdmin = "return document.querySelector(\"#root > div.administracion-prod > div.paneles-prod > div.MuiBox-root.css-7xlv4r\")";
        baseWrapper.FactoryShadowRootObjectVisibility(cajaOpcionesAdmin);
    }

    public void seleccionarOpcionListaProductos() throws InterruptedException {
        String listarProducto = "return document.querySelector(\"#root > div.administracion-prod > div.paneles-prod > div.MuiBox-root.css-7xlv4r > ul > a:nth-child(4) > li > div\")";
        baseWrapper.FactoryShadowRootObjectVisibility(listarProducto);
        baseWrapper.ClickShadowRootObject(listarProducto);
        Thread.sleep(2000);
        System.out.println("***Seleccion Ok ***");
    }

    public void visualizaLosProductos() throws InterruptedException {
        String producto = "return document.querySelector(\"#root > div.administracion-prod > div.paneles-prod > div:nth-child(2) > div > div.MuiTableContainer-root.css-975zys > table > tbody > tr:nth-child(1)\")";
        baseWrapper.FactoryShadowRootObjectVisibility(producto);
        System.out.println("***visualiza Los Productos ***");
    }

    public void seleccionarOpcionAgregarProductos() throws InterruptedException {
        String agregarProducto = "return document.querySelector(\"#root > div.administracion-prod > div.paneles-prod > div.MuiBox-root.css-7xlv4r > ul > a:nth-child(3) > li > div\")";
        baseWrapper.FactoryShadowRootObjectVisibility(agregarProducto);
        baseWrapper.ClickShadowRootObject(agregarProducto);
        Thread.sleep(2000);
        System.out.println("***Seleccion Ok ***");
    }

    public void visualizaAgregarProducto() throws InterruptedException {
        String agregarProductos = "return document.querySelector(\"#nombreProducto\")";
        baseWrapper.FactoryShadowRootObjectVisibility(agregarProductos);
        System.out.println("***visualiza Los Productos ***");
    }

    public void seleccionaLaOpcionAdministrarCaracteristica() throws InterruptedException {
        String administarCaracteristicas = "return document.querySelector(\"#root > div.administracion-prod > div.paneles-prod > div.MuiBox-root.css-7xlv4r > ul > a:nth-child(5) > li > div\")";
        baseWrapper.FactoryShadowRootObjectVisibility(administarCaracteristicas);
        baseWrapper.ClickShadowRootObject(administarCaracteristicas);
        Thread.sleep(2000);
        System.out.println("***Seleccion Ok ***");
    }

    public void visualizaLasCaracteristicas() throws InterruptedException {
        Thread.sleep(3000);
        String carate = "return document.querySelector(\"#root > div.administracion-car > div.paneles-car > div:nth-child(2) > div.MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded.MuiPaper-elevation1.css-1cf86vr > div > table > tbody > tr:nth-child(1) > td:nth-child(1)\")";
        baseWrapper.FactoryShadowRootObjectVisibility(carate);
    }
}
