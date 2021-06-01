{{--
  Template Name: Home Default Template
--}}

@extends('layouts.app')

@section('content')
    @while(have_posts()) @php the_post() @endphp
        @include('partials.home.homepage-slider')
        @include('partials.home.quick-hit')
        @include('partials.home.services')
        @include('partials.home.experience')
        @include('partials.home.industry-solutions')
        @include('partials.home.offers')
        @if($choose_order == '1')
            @include('partials.home.selected-clients')
            @include('partials.home.careers')
            @include('partials.home.seo-copy')
        @else
            @include('partials.home.seo-copy')
            @include('partials.home.careers')
            @include('partials.home.selected-clients')
        @endif
    @endwhile
@endsection
