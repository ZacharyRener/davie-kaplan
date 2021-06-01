@extends('layouts.app')

@include('partials.subpage.header-image')
<div class="main-container">
    <section class="about-body-section slide-up">
        <div class="container">
            <div class='row'>
                @include('partials.subpage.content')
                @include('partials.subpage.sidebar')
            </div>
        </div>
    </section>
</div>