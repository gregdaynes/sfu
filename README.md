JEKYLL Playgound

## By Category

    {% for cat in site.categories %}
  
      {{cat[0]}}

      {% for item in cat[1] %}
        {{item.title}}
      {% endfor %}
  
    {% endfor %}

---

<h2>By Date</h2>
  {% for item in site.categories.temp limit:1000 %}
    
      {% capture date %}{{ item.date | date: '%B %Y' }}{% endcapture %}
      {% capture ndate %}{{ item.next.date | date: '%B %Y' }}{% endcapture %}
      
        
      
      {% if date != ndate %}
        <h4>{{item.date | date: '%B %Y'}}</h4>
      {% endif %}
      <ul>
        <li>
          <a  href='{{item.url}}'>{{item.title}} - {{item.date | date:"%b %d"}}</a>          
        </li>
    </ul>
    
  {% endfor %}

<hr />

<h2>Intro Paragraphs and Read More</h2>
<p>
<!-- readmore -->
<!-- split at readmore -->
{% for item in site.posts %}
  {{ item.title }}
  {% if item.content contains "<!-- more -->" %}
    {{ item.content | split:"<!-- more -->" | first % }}
  {% else %}
    {{ item.content | strip_html | truncatewords:30 }}
  {% endif %}
  <a  href='{{item.url}}'>Read More…</a>
  <br />---
<!-- readmore -->
</p>
{% endfor %}
<hr />

<h2>List Categories</h2>
{% for category in site.categories %}
    <a href="/{{ category | first | slugize }}/">
        {{ category | first }}
    </a>
{% endfor %}
