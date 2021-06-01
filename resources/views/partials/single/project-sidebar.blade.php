@if($subtitle || $client || $team || $size || $construction_value || $services || $markets)
<h4>Project Details</h4>
@endif

@if($subtitle)
    <h5>Client</h5>
    {!! $subtitle !!}
@endif

@if($client)
    <h5>Location</h5>
    {!! $client !!}
@endif

@if($team)
    <h5>Leadership</h5>
    @foreach($team as $member)
    <p>{{ get_the_title($member) }}</p>
    @endforeach
@endif

@if($size)
    <h5>Size</h5>
    {!! $size !!}
@endif

@if($construction_value)
    <h5>Construction Value</h5>
    {!! $construction_value !!}
@endif

@if($services)
    <h5>Services</h5>
    {!! $services !!}
@endif

@if($markets)
    <h5>Industries</h5>
    {!! $markets !!}
@endif