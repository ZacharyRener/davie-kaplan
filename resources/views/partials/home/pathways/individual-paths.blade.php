@foreach($homepage_ind_pathways as $pathway)

    @php
    $indtext = $pathway->ind_text;
    $indbutton_link = $pathway->ind_button_link;
    $indbutton_border = $pathway->border_width;
    $indbutton_border_color = $pathway->border_color;
    $pathway_icon = $pathway->pathway_icon;
    $pathway_bg = $pathway->pathway_bg;
    $backgroundImage = !empty($pathway->pathway_bg)
        ? "background: url($pathway->pathway_bg);"
        : '';
    @endphp
				
    <div class="col-md-4 col-sm-6 a-button">
        <div class='wrapper'>
            <a style="border-width: {{ $indbutton_border }}px !important; border-color: {{ $indbutton_border_color }} !important; {{$backgroundImage}}" href="{{ $indbutton_link }}">
                <div class='gradient-overlay'></div>
                <span>
                    <div class='arrow-wrapper'>
                        <div class='animating-arrow'>
                            <img src='/wp-content/uploads/2021/06/orange-arrow.png'>
                        </div>
                    </div>
                    @if(!empty($pathway_icon)) 
                        {{ '<img src="'.$pathway_icon.'"><br />' }}
                    @endif
                    <div class='content'>{{ $indtext }}</div>
                </span>
            </a>
        </div>
    </div>

@endforeach		
