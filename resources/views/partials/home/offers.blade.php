<section id='home-offers'>
    <div class='container'>

        <div class="col-sm-12 row b-t-p-section">

            @foreach($offers_select as $offer)

                @php 
                $counter = '0';
                $offer_id = $offer->offer;
                $offer_style = $offer->offer_style;
                $offer_alignment = $offer->offer_alignment;
                @endphp

                @if($offer_style == "STY1" && $offer_id != 'select')
                    @include('partials.home.offers.default-offer-loop')
                @elseif($offer_style == "STY2" && $offer_id != 'select')
                    @include('partials.home.offers.alternative-offer-loop')
                @endif

                @php $counter++ @endphp
                
            @endforeach

            @if($counter < 3)

            <div class="col-sm-4 team-box">
                
                <div class="our-team-box blog-box" style="background-color: {{ $custom_bg }}">
                    <div style="padding: 10px 25px 25px 25px;">
                        <h5><a href='#'>{{ $dynamic_offer_title }}</a></h5>
                        <ul>
                            @php 
                            $args = array(
                                'post_type'              => array( 'post' ),
                                'post_status'            => array( 'publish' ),
                                'posts_per_page'         => '4',
                            );
                            
                            $query = new WP_Query( $args );
                            @endphp

                            @if($query->have_posts()) 
                                @while($query->have_posts()) @php $query->the_post(); @endphp
                            
                                    <li>
                                        <h6><a href="{{ get_the_permalink() }}">{{ get_the_title() }}</a></h6>
                                        <span class="datentime">{{ get_the_date() }}</span>
                                    </li>

                                @endwhile
                            @endif
                            
                            @php wp_reset_query(); @endphp

                        </ul>
                        <a href="/insights/articles" class="button arrow red">
                            View Our Articles
                        </a>
                    </div>
                </div>
            </div>

            @endif

        </div>
        
    </div>
</section>