@extends('layouts.app')

@section('content')
@include('partials.subpage.header-image')
<div class="main-container">
    <section class="about-body-section slide-up">
        <div class="container">
            <div class='row'>
                @include('partials.single.leadership')
                @include('partials.subpage.sidebar')
            </div>
        </div>
        @include('partials.single.fun-fact')
    </section>
</div>
@endsection