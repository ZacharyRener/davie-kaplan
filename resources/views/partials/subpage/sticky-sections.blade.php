<section id='sticky-sections'>

    @if($enable_sticky_section_navigation && $sections)

        <div class='navigation'>
            <div class='sections'>
            @php $counter = 0; @endphp
            @foreach($sections as $section)
                @php $counter += 1; @endphp
                <div class='section-title @if($counter == 1)active @endif' section-id={{$counter}}>
                    <a href='#section-{{$counter}}'>{!! $section->section_title !!}</a>
                </div>
            @endforeach
            </div>
        </div>

       
        <div class='content' >  
            @php $counter = 0; @endphp      
            @foreach($sections as $section)
                @php $counter += 1; @endphp
                <div class='section-content' id='section-{{$counter}}' section-id={{$counter}}>
                    {!! $section->section_content !!}
                </div>
            @endforeach
        </div>

    @endif
    

</section>