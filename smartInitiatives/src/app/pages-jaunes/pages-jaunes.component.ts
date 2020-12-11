import { Component, ComponentFactoryResolver, ComponentRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ArtisanCvComponent } from '../artisan-cv/artisan-cv.component';

@Component({
  selector: 'app-pages-jaunes',
  templateUrl: './pages-jaunes.component.html',
  styleUrls: ['./pages-jaunes.component.scss']
})
export class PagesJaunesComponent implements OnInit {
  @ViewChild("viewContainerRef", { read: ViewContainerRef }) VCR: ViewContainerRef;
  child_unique_key: number = 0;
  componentsReferences = Array<ComponentRef<ArtisanCvComponent>>()

  constructor(private CFR: ComponentFactoryResolver) { }

  ngOnInit(): void {
    // this.createComponent();
  }

  createComponent() {
    let componentFactory = this.CFR.resolveComponentFactory(ArtisanCvComponent);

    let childComponentRef = this.VCR.createComponent(componentFactory);

    let childComponent = childComponentRef.instance;
    childComponent.unique_key = ++this.child_unique_key;
    childComponent.parentRef = this;

    // add reference for newly created component
    this.componentsReferences.push(childComponentRef);
  }

}
