+++
parent = "root.html"
+++

# {{ child::data.title }}

{{ child::data.date | date }} `{{ child::content | md5 }}`

{{ child::content | markdown }}
