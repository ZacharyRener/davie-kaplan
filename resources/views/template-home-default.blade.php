{{--
  Template Name: Home Default Template
--}}

@extends('layouts.app')

@section('content')
    @while(have_posts()) @php the_post() @endphp
        @include('partials.home.homepage-slider')
        @include('partials.home.quick-hit')
        @include('partials.home.pathways')
        @include('partials.home.slick-carousel')
        @include('partials.home.offers')
        @include('partials.home.seo-copy')
    @endwhile
@endsection
