@if(have_rows('tray_menu', 'options'))
    @while(have_rows('tray_menu', 'options'))
        @php the_row(); @endphp

        @if(have_rows('top_level_links'))
            @while(have_rows('top_level_links'))
                @php the_row(); @endphp

                @php
                $top_level_title = get_sub_field('top_level_title');
                $top_level_link = get_sub_field('top_level_link');
                $has_dropdown_menu = get_sub_field('has_dropdown_menu');
                @endphp

                <div class='top-level-nav-item @if($has_dropdown_menu) has-dropdown-menu @endif'>
                    <a href='{{$top_level_link}}'>{{$top_level_title}}</a>
                    @if($has_dropdown_menu)
                        <div class='dropdown-menu-wrapper'>
                        <div class='dropdown-menu-custom hidden'>
                            @if(have_rows('column'))
                                @while(have_rows('column'))
                                    @php the_row(); @endphp
                                    <div class='column'>
                                    @if(have_rows('section'))
                                        @while(have_rows('section'))
                                            @php the_row(); @endphp

                                            @php
                                            $section_title = get_sub_field('section_title');
                                            $section_link = get_sub_field('section_link');
                                            $enable_sub_menu = get_sub_field('enable_sub_menu');
                                            @endphp

                                            <div class='section'>

                                                <a class='section-title-custom' href='{{$section_link}}'>{{$section_title}}</a>
                                                @if($enable_sub_menu)
                                                <div class='sub-menu'>
                                                    @if(have_rows('sub_menu'))
                                                        @while(have_rows('sub_menu'))
                                                            @php the_row(); @endphp

                                                            @php
                                                            $page_title = get_sub_field('page_title');
                                                            $page_link = get_sub_field('page_link');
                                                            @endphp

                                                            <a class='sub-menu-link' href='{{$page_link}}'>{{$page_title}}</a>

                                                        @endwhile
                                                    @endif
                                                </div>
                                                @endif

                                            </div>

                                        @endwhile
                                    @endif
                                    </div>
                                @endwhile
                            @endif
                        </div>
                    </div>
                    @endif
                </div>

            @endwhile
        @endif

    @endwhile
@endif