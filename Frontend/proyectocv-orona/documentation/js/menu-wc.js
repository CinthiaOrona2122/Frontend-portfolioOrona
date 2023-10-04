'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">proyectocv documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-AppModule-a11779c7ee2b2b81d6130852b1a8d168e9e57552f0f785e6f9e509758938e391c18c876f5d45f761511e224f12e11e769cd72ed1127a105d13e58cfac40f8c0f"' : 'data-bs-target="#xs-components-links-module-AppModule-a11779c7ee2b2b81d6130852b1a8d168e9e57552f0f785e6f9e509758938e391c18c876f5d45f761511e224f12e11e769cd72ed1127a105d13e58cfac40f8c0f"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-a11779c7ee2b2b81d6130852b1a8d168e9e57552f0f785e6f9e509758938e391c18c876f5d45f761511e224f12e11e769cd72ed1127a105d13e58cfac40f8c0f"' :
                                            'id="xs-components-links-module-AppModule-a11779c7ee2b2b81d6130852b1a8d168e9e57552f0f785e6f9e509758938e391c18c876f5d45f761511e224f12e11e769cd72ed1127a105d13e58cfac40f8c0f"' }>
                                            <li class="link">
                                                <a href="components/AboutComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AboutComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AchievementsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AchievementsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AptitudesComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AptitudesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EducationComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EducationComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ExperienceComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ExperienceComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HomeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HomeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NotFoundComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NotFoundComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PersonComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PersonComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SkillsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SkillsComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AboutService.html" data-type="entity-link" >AboutService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AchievementsService.html" data-type="entity-link" >AchievementsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AptitudeService.html" data-type="entity-link" >AptitudeService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthServiceService.html" data-type="entity-link" >AuthServiceService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/EducationService.html" data-type="entity-link" >EducationService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ExperienceService.html" data-type="entity-link" >ExperienceService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PersonaService.html" data-type="entity-link" >PersonaService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ProgressbarService.html" data-type="entity-link" >ProgressbarService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/About.html" data-type="entity-link" >About</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Achievement.html" data-type="entity-link" >Achievement</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Aptitude.html" data-type="entity-link" >Aptitude</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Education.html" data-type="entity-link" >Education</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Experience.html" data-type="entity-link" >Experience</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Login.html" data-type="entity-link" >Login</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Person.html" data-type="entity-link" >Person</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Progressbar.html" data-type="entity-link" >Progressbar</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});