import React, { Component } from "react"
import { NavLink } from 'react-router-dom'
import $ from 'jquery'
import Cookies from 'js-cookie'

const removeToken = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('refresh_token')
    localStorage.removeItem('student_status')
    localStorage.removeItem('roles')
    localStorage.removeItem('courses')
    localStorage.removeItem('user')
    localStorage.removeItem('options')
    localStorage.removeItem('categories')
    window.location = '/'
}

const printFirstName = () => {
    return localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).firstname : null
}

const withLayout = (propValue) => (WrappedComponent) => {
    return class withLayout extends Component {

        componentDidMount () {
            // console.log('init en el componentDidMount')

            $( document ).ready(function() {
                function addActive() {
                    $(".sidenav-toggler").addClass("active");
                    $(".sidenav-toggler").data("action", "sidenav-unpin"); 
                    $("body").removeClass("g-sidenav-hidden").addClass("g-sidenav-show g-sidenav-pinned")
                    $("body").append('<div class="backdrop d-xl-none" data-action="sidenav-unpin" data-target=' + $("#sidenav-main").data("target") + " />");
                    Cookies.set("sidenav-state", "pinned")
                }
                function removeActive() {
                    $(".sidenav-toggler").removeClass("active");
                     $(".sidenav-toggler").data("action", "sidenav-pin");
                     $("body").removeClass("g-sidenav-pinned").addClass("g-sidenav-hidden");
                     $("body").find(".backdrop").remove(); 
                     Cookies.set("sidenav-state", "unpinned");
                }

                var t = Cookies.get("sidenav-state") ? Cookies.get("sidenav-state") : "unpinned";

                // console.log(t)

                if($(window).width() > 1200 && t === "unpinned" ){
                    // CUANDO MENU APARECE AL HACER HOVER
                    // console.log(1,'MENU SUELTO')
                    // console.warn('ELEGÍ Y OCULTO ENLACES')
                    $("body").removeClass("g-sidenav-show").addClass("g-sidenav-hidden")
                    
                    removeActive()

                    $("body").on("click", "[data-action]", function(t) {
                        t.preventDefault();
		
                        var n = $(this),
                            i = n.data("action");
                        n.data("target");
                        switch (i) {
                            case "sidenav-pin":
                                addActive();
                                // console.log("en sidenav-pin", Cookies.get("sidenav-state"))                           
                            break;
                            case "sidenav-unpin":
                                removeActive();
                                // console.info("en sidenav-unpin", Cookies.get("sidenav-state"))
                                   
                            break;

                            case "search-show":
                                // console.log("search-show")

                            break;

                            case "search-close":
                                // console.log("search-close")

                            break;

                            default:
                            break;

                        }
                    })

                }else{
                    // CUANDO MENU SE QUEDA QUIETO
                    // console.log(2, 'SE HA PINEADO EL MENU')

                    addActive();

                    $("body").on("click", "[data-action]", function(t) {

                        t.preventDefault();
		
                        var n = $(this),
                            i = n.data("action");
                        n.data("target");
                        switch (i) {
                            case "sidenav-pin":
                                // console.log('debo pinear aqui y se ha atascado')
                                addActive();
                                // window.location.reload()
                            break;

                            case "sidenav-unpin":
                                // console.warn('debo despinear aqui y se ha desineado')
                                removeActive();
                            break;
                            default:
                            
                            break;
                        }

                    })
                }

                $(".sidenav").on("mouseenter", function() {
                    // console.info('entre mouse')
                    $("body").hasClass("g-sidenav-pinned") || $("body").removeClass("g-sidenav-hide").removeClass("g-sidenav-hidden").addClass("g-sidenav-show")
                })


                $(".sidenav").on("mouseleave", function() {
                    // console.log('sali mouse')
                    if(Cookies.get("sidenav-state") === 'unpinned'){
                        // console.log('oculto enlaces')
                            $("body").removeClass("g-sidenav-show").addClass("g-sidenav-hidden")
                    }
                })

            });
        }

        render() {
            return (
                <>

                    {/* Sidenav */}
                    <nav className="sidenav navbar navbar-vertical fixed-left navbar-expand-xs navbar-light bg-white" id="sidenav-main">
                        <div className="scrollbar-inner" style={{overflowX: 'hidden'}}>
                            <div className="sidenav-header d-flex align-items-center">
                                <a className="navbar-brand usil-logo" href="/">
                                    <span className="icon-usil-circular logo-circular logo-online"><span className="path1"></span><span className="path2"></span><span className="path3"></span><span className="path4"></span><span className="path5"></span></span>
                                    <i className="circle-status online"></i>
                                </a>
                                <div className="ml-auto">
                                    <div id="hamburger" className="sidenav-toggler d-none d-xl-block" data-action="sidenav-unpin" data-target="#sidenav-main">
                                        <div className="sidenav-toggler-inner">
                                        <i className="sidenav-toggler-line"></i>
                                        <i className="sidenav-toggler-line"></i>
                                        <i className="sidenav-toggler-line"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="navbar-inner">
                                <div className="collapse navbar-collapse" id="sidenav-collapse-main">

                                    <ul className="navbar-nav">
                                        <li className="nav-item">
                                        {/* <a className="nav-link" href="/admin">
                                            <i className="fa fa-folder-open text-success"></i>
                                            <span className="nav-link-text">Admin</span>
                                        </a> */}

                                        <NavLink className="nav-link" to='/admin' >
                                            <i className="fa fa-folder-open text-success"></i>
                                            <span className="nav-link-text">Admin</span>
                                        </NavLink>
                                        </li>

                                        
                                        <li className="nav-item">
                                        {/* <a className="nav-link active" href="/">
                                            <i className="fa fa-home text-info"></i>
                                            <span className="nav-link-text">Tablero</span>
                                        </a> */}
                                        <NavLink className="nav-link" to='/' exact>
                                            <i className="fa fa-home text-info"></i>
                                            <span className="nav-link-text">Tablero</span>
                                        </NavLink>
                                        </li>
                                        <li className="nav-item">
                                        {/* <a className="nav-link" href="calendario.html">
                                            <i className="fa fa-calendar text-danger"></i>
                                            <span className="nav-link-text">Calendario</span>
                                        </a> */}
                                        <NavLink className="nav-link" to='/calendar'>
                                            <i className="fa fa-calendar text-danger"></i>
                                            <span className="nav-link-text">Calendario</span>
                                        </NavLink>
                                        </li>
                                        <li className="nav-item">
                                        {/* <a className="nav-link" href="/grupos.html">
                                            <i className="fa fa-group text-primary"></i>
                                            <span className="nav-link-text">Grupos</span>
                                        </a> */}
                                        <NavLink className="nav-link" to='/groups'>
                                            <i className="fa fa-group text-primary"></i>
                                            <span className="nav-link-text">Grupos</span>
                                        </NavLink>
                                        </li>
                                        <li className="nav-item">
                                        {/* <a className="nav-link" href="/bandeja-entrada.html">
                                            <i className="fa fa-envelope-o text-warning"></i>
                                            <span className="nav-link-text">Correo</span>
                                        </a> */}
                                        <NavLink className="nav-link" to='/conversations'>
                                            <i className="fa fa-envelope-o text-warning"></i>
                                            <span className="nav-link-text">Correo</span>
                                        </NavLink>
                                        </li>
                                    </ul>

                                    <hr className="my-3" />

                                    <ul className="navbar-nav">
                                        <li className="nav-item">
                                        <a className="nav-link" href="#nav-ayuda" data-toggle="collapse" role="button" aria-controls="nav-ayuda">
                                            <i className="fa fa-life-ring text-muted"></i>
                                            <span className="nav-link-text">Ayuda</span>
                                        </a>
                                        <div className="collapse" id="nav-ayuda" >
                                            <ul className="nav nav-sm flex-column">
                                                <li className="nav-item">
                                                    <NavLink className="nav-link" to='/support' exact>
                                                    <i className="fa fa-question-circle-o"></i> Preguntas frecuentes
                                                    </NavLink>
                                                </li>
                                                <li className="nav-item">
                                                    {/* <a href="#!" className="nav-link"><i className="fa fa-play-circle"></i> Video Tutorial</a> */}
                                                    <NavLink className="nav-link" to='/tutorials' >
                                                    <i className="fa fa-play-circle"></i> Video Tutorial
                                                    </NavLink>
                                                </li>
                                            </ul>
                                        </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            </div>
                    </nav>
                
                    {/* Main Content */}
                    <div className="main-content" id="panel">

                        {/* Topnav */}

                        <nav className="navbar navbar-top navbar-expand navbar-light bg-white border-bottom bg-shadow-fx fixed-top">
                            <div className="container-fluid">
                                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                
                                    <ul className="navbar-nav align-items-center ml-md-auto">
                                        <li className="nav-item d-xl-none">
                                    
                                        <div className="pr-3 sidenav-toggler sidenav-toggler-light" data-action="sidenav-pin" data-target="#sidenav-main">
                                            <div className="sidenav-toggler-inner">
                                                <i className="sidenav-toggler-line"></i>
                                                <i className="sidenav-toggler-line"></i>
                                                <i className="sidenav-toggler-line"></i>
                                            </div>
                                        </div>
                                        </li>
                                        <li className="nav-item d-sm-none">
                                        <a className="nav-link" href="#!" data-action="search-show" data-target="#navbar-search-main">
                                            <i className="fa fa-search"></i>
                                        </a>
                                        </li>
                                        <li className="nav-item dropdown">
                                        <a className="nav-link bell-fx" href="#!" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <i className="fa fa-bell-o"></i>
                                        </a>
                                        <div className="dropdown-menu dropdown-menu-xl dropdown-menu-right py-0 overflow-hidden">
                        
                                            <div className="px-3 py-3">
                                                <h6 className="text-sm text-muted m-0">Tienes <strong className="text-primary">1</strong> notificación.</h6>
                                            </div>
                        
                                            <div className="list-group list-group-flush">
                                                <a href="#!" className="list-group-item list-group-item-action">
                                                    <div className="row align-items-center">
                                                    <div className="col-auto">

                                                        <img src={require("../../assets/img/4.png")} alt="demo4" className="avatar rounded-circle" />
                                                    </div>
                                                    <div className="col ml--2">
                                                        <div className="d-flex justify-content-between align-items-center">
                                                            <div>
                                                                <h4 className="mb-0 text-sm">Profesor Juan Carlos.</h4>
                                                            </div>
                                                            <div className="text-right text-muted">
                                                                <small>hace 2 horas</small>
                                                            </div>
                                                        </div>
                                                        <p className="text-sm mb-0">Nuevo curso agregado a la plataforma...</p>
                                                    </div>
                                                    </div>
                                                </a>
                                            </div>

                                            <a href="#!" className="dropdown-item text-center text-primary font-weight-bold py-3">Ver todos</a>
                                        </div>
                                        </li>
                                    </ul>
                                    <ul className="navbar-nav align-items-center ml-auto ml-md-0">
                                        <li className="nav-item dropdown">
                                        <a className="nav-link pr-0" href="#!" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <div className="media align-items-center">
                                                <span className="avatar avatar-sm rounded-circle">
                                                    <img src={require("../../assets/img/3.png")} alt="demo3" />
                                                </span>
                                                <div className="media-body ml-2 d-none d-lg-block">
                                                    <span className="mb-0 text-sm  font-weight-bold">Hola! {printFirstName()} <i className="fa fa-caret-down"></i></span>
                                                </div>
                                            </div>
                                        </a>
                                        <div className="dropdown-menu dropdown-menu-right">
                                            <a href="#!" className="dropdown-item">
                                                <i className="fa fa-user"></i>
                                                <span>Mi perfil</span>
                                            </a>
                                            <a href="#!" className="dropdown-item">
                                                <i className="fa fa-cogs"></i>
                                                <span>Configuración</span>
                                            </a>
                                            <div className="dropdown-divider"></div>
                                            <span className="dropdown-item" onClick={() => removeToken()}>
                                                <i className="fa fa-sign-out"></i>
                                                <span>Salir</span>
                                            </span>
                                        </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </nav>

                        {/* Contenido */}

                        <WrappedComponent {...this.props} />


                    </div>
                    

                </>
            )
        }

    }
}

export default withLayout