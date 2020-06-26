import {
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  EmbeddedViewRef,
  Input,
  TemplateRef,
  ViewContainerRef
} from "@angular/core";
import { LoadingSpinner } from "../../components/components/loading-spinner/loading-spinner.component";

@Directive({
  selector: "[isLoading]"
})
export class IsLoadingDirective<T = unknown> {
  private _context = new NgIfContext<T>();
  private _thenTemplateRef: TemplateRef<NgIfContext<T>> | null = null;
  private _thenViewRef: EmbeddedViewRef<NgIfContext<T>> | null = null;
  private _elseTemplateRef: TemplateRef<NgIfContext<T>> | null = null;
  private _elseViewRef: ComponentRef<LoadingSpinner> | null = null;

  private _loadingSpinnerComponentFactory: ComponentFactory<LoadingSpinner> | null = null;

  constructor(
    private _viewContainer: ViewContainerRef,
    templateRef: TemplateRef<NgIfContext<T>>,
    private resolver: ComponentFactoryResolver
  ) {
    this._thenTemplateRef = templateRef;
    this._loadingSpinnerComponentFactory = this.resolver.resolveComponentFactory(LoadingSpinner);
  }

  @Input()
  set isLoading(condition: T) {
    this._context.$implicit = this._context.isLoading = condition;
    this._updateView();
  }

  /**
   * A template to show if the condition expression evaluates to true.
   */
  @Input()
  set isLoadingThen(templateRef: TemplateRef<NgIfContext<T>> | null) {
    this._thenTemplateRef = templateRef;
    this._thenViewRef = null; // clear previous view if any.
    this._updateView();
  }

  /**
   * A template to show if the condition expression evaluates to false.
   */
  @Input()
  set isLoadingElse(templateRef: TemplateRef<NgIfContext<T>> | null) {
    this._elseTemplateRef = templateRef;
    this._elseViewRef = null; // clear previous view if any.
    this._updateView();
  }

  private _updateView() {
    if (this._context.$implicit) {
      if (!this._thenViewRef) {
        this._viewContainer.clear();
        this._elseViewRef = null;
        if (this._thenTemplateRef) {
          this._thenViewRef = this._viewContainer.createEmbeddedView(this._thenTemplateRef, this._context);
        }
      }
    } else {
      if (!this._elseViewRef) {
        this._viewContainer.clear();
        this._thenViewRef = null;
        this._viewContainer.createComponent(this._loadingSpinnerComponentFactory);
      }
    }
  }
}

/**
 * @publicApi
 */
export class NgIfContext<T = unknown> {
  public $implicit: T = null!;
  public isLoading: T = null!;
}
