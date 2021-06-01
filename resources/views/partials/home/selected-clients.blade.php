<section class='clients-wrapper'>
@if(have_rows('select_clients'))

    @php
    $clients_bg = get_theme_mod('hpf_client_slider_background_color'); 
    $hpf_client_slider_headline_text = get_theme_mod('hpf_client_slider_headline_text');
    @endphp

    <section class="clients-section" style="background-color: {{ $clients_bg }}">
        <div class="section-wrapper">
            <p class="section-header">
                @if( !empty($hpf_client_slider_headline_text ) ) 
                    {{ $hpf_client_slider_headline_text }}
                @else 
                    {{ "Select Clients" }}
                @endif
            </p>
        </div>
        <div class="container">
            <div class="col-sm-12 client-slider">
                <div class="owl-carousel-clients desktopOnly" @if( $title_border == '2' ) {{ 'style="border-top: 0px !important;";' }} @endif >

                    <?php
                    
                    $rows = get_field('select_clients');
                    if($rows){

                        for($i=0; $i<count($rows); $i++){

                            $client = $rows[$i];
                            $nextClient = $rows[$i+1];
                            
                            ?><div class="item two-logos">
                                <img src="{{$client['client_logo']}}" style="padding-top: {{ $client['client_logo_padding_top'] }}; padding-bottom: {{ $client['client_logo_padding_bottom'] }};" />
                                <?php if($i < count($rows) - 1){ ?>
                                <img src="{{$nextClient['client_logo']}}" style="padding-top: {{ $client['client_logo_padding_top'] }}; padding-bottom: {{ $client['client_logo_padding_bottom'] }};" />
                                <?php } ?>
                            </div><?php

                            $i++;

                        }

                    }

                    ?>

                    
                
                </div>
                <div class="owl-carousel-clients mobileOnly" @if( $title_border == '2' ) {{ 'style="border-top: 0px !important;";' }} @endif >

                    <?php
                    
                    $rows = get_field('select_clients');
                    if($rows){

                        for($i=0; $i<count($rows); $i++){

                            $client = $rows[$i];
                            $nextClient = $rows[$i+1];
                            $thirdClient = $rows[$i+2];
                            $fourthClient = $rows[$i+3];
                            
                            ?><div class="item four-logos">
                                <img src="{{$client['client_logo']}}" style="padding-top: {{ $client['client_logo_padding_top'] }}; padding-bottom: {{ $client['client_logo_padding_bottom'] }};" />
                                <img src="{{$nextClient['client_logo']}}" style="padding-top: {{ $client['client_logo_padding_top'] }}; padding-bottom: {{ $client['client_logo_padding_bottom'] }};" />
                                <img src="{{$thirdClient['client_logo']}}" style="padding-top: {{ $client['client_logo_padding_top'] }}; padding-bottom: {{ $client['client_logo_padding_bottom'] }};" />
                                <?php if($i < count($rows) - 4){ ?>
                                <img src="{{$fourthClient['client_logo']}}" style="padding-top: {{ $client['client_logo_padding_top'] }}; padding-bottom: {{ $client['client_logo_padding_bottom'] }};" />
                                <?php } ?>
                            </div><?php

                            $i+=3;

                        }

                    }

                    ?>

                    
                
                </div>
            </div>
        </div>
    </section>
    
@endif

@if(have_rows('select_clients_bottom') && false)

    @php
    $clients_bg = get_theme_mod('hpf_client_slider_background_color'); 
    $hpf_client_slider_headline_text = get_theme_mod('hpf_client_slider_headline_text');
    @endphp

    <section class="clients-section" style="background-color: {{ $clients_bg }}">
        
        <div class="container">
            <div class="col-sm-12 client-slider">
                <div class="owl-carousel-clients" @if( $title_border == '2' ) {{ 'style="border-top: 0px !important;";' }} @endif >
                
                    @foreach($select_clients_bottom as $client)
                        <div class="item">
                            <img src="{{$client->client_logo}}" style="padding-top: {{ $client->client_logo_padding_top }}; padding-bottom: {{ $client->client_logo_padding_bottom }};" />
                        </div>
                    @endforeach
                
                </div>

            </div>
        </div>
    </section>
    
@endif
</section>