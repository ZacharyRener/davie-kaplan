<div class="pathways @if($pathways_style == 'FULLBOX') {{ "fullwidth" }} @endif container slide-up" @if($pathways_style == 'NONE') {{ 'style="padding-top: 80px !important;"' }} @else {{ '' }} @endif >
    <div class="col-sm-12 a-e-p-buttons row" @if($pathways_style == 'NONE') {{ 'style="display: none !important;"' }} @else {{ '' }} @endif >
			
        @if($pathways_style == 'INDBOX')
            @include('partials.home.pathways.individual-paths')
        @endif

        @if($pathways_style == 'SINGBOX')
            @include('partials.home.pathways.single-box-paths')
        @endif
        
        @if($pathways_style == 'FULLBOX')
            @include('partials.home.pathways.full-width-paths')
        @endif

    </div>
</div>