<section id='industry-solutions'>
    
    <div class='section-wrapper'>
        <p class='section-header'>Industry Solutions</p>
    </div>
    <div class='solutions container'>
        @foreach($industry_solutions as $solution)
        <div class='solution hidden'>
            <p class='title'>{{$solution->title}}</p>
            <p class='excerpt'>{{$solution->excerpt}}</p>
            <a class='learn-more' href='{{$solution->link}}'>Learn More</a>
        </div>
        @endforeach
    </div>

</section>