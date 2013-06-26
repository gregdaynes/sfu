JEKYLL Playgound

## page specified category

    {% for item in site.categories[page.category] %}
      {% if item.type != "static" %}
        {{item.title}}
      {% endif %}
    {% endfor %}

---

## By Category

    {% for cat in site.categories %}
  
      {{cat[0]}}

      {% for item in cat[1] %}
        {{item.title}}
      {% endfor %}
  
    {% endfor %}

---

## By Date
    
    {% for item in site.categories.temp limit:1000 %}
    
      {% capture date %}{{ item.date | date: '%B %Y' }}{% endcapture %}
      {% capture ndate %}{{ item.next.date | date: '%B %Y' }}{% endcapture %}    
      
      {% if date != ndate %}
        {{item.date | date: '%B %Y'}}
      {% endif %}
      
      {{item.url}} - {{item.title}} - {{item.date | date:"%b %d"}}        
    {% endfor %}

---

## Intro Paragraphs and Read More

    {% for item in site.posts %}
      {% if item.content contains "<!-- more -->" %}
        {{ item.content | split:"<!-- more -->" | first % }}
      {% else %}
        {{ item.content | strip_html | truncatewords:30 }}
      {% endif %}
    {% endfor %}

---

## List Categories

    {% for category in site.categories %}
    <a href="/{{ category | first | slugize }}/">
      {{ category | first }}
    </a>
    {% endfor %}
