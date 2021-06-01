@foreach($homepage_ind_pathways as $pathway)

    @php
    $indtext = $pathway->$ind_text;
    $indbutton_link = $pathway->$ind_button_link;
    $indbutton_border = $pathway->$border_width;
    $indbutton_border_color = $pathway->$border_color;
    $pathway_icon = $pathway->$pathway_icon;
    $pathway_bg = $pathway->$pathway_bg;
    @endphp
				
    <div class="col-sm-4 a-button">
        <a style="border-width: {{ $indbutton_border }}px !important; border-color: {{ $indbutton_border_color }} !important; background-image:url('@if( !empty($pathway->pathway_bg)) {{ $pathway->pathway_bg }} @endif') !important;" href="{{ $indbutton_link }}">
            <span>
                @if(!empty($pathway_icon)) 
                    {{ '<img src="'.$pathway_icon.'"><br />' }}
                @endif
                {{ $indtext }}
            </span>
        </a>
    </div>

@endforeach		
