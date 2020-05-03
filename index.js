class Select {
  constructor({ selector, label, url }) {
    fetchData()
    const globalParent = document.querySelector(selector)

    const form = document.getElementById('form')
    const formText = document.getElementById('formtext')

    const openBtn = document.querySelector('#open')
    const closeBtn = document.querySelector('#close')
    const setBtn = document.querySelector('#set')
    const getBtn = document.querySelector('#get')
    const destroyBtn = document.querySelector('#destroy')

    const svgArrow = document.querySelector('.container svg')

    const listEl = document.createElement('ul')
    const formLabel = createElement(globalParent, 'label', 'lableBottom')
    formLabel.innerText = label

    var data = data || fetchData()

    var selectedEl = ''

    async function fetchData() {
      var response = await fetch('data/data.json')
      data = await response.json()
      return data
    }

    function closeSelect() {
      formLabel.classList.add('lableBottom')
      formLabel.classList.remove('lableTop')
      removeAllChild(formText)
      listEl.removeEventListener('click', selectItem)
    }

    function openSelect() {
      formLabel.classList.remove('lableBottom')
      formLabel.classList.add('lableTop')
    }

    function openList() {
      svgArrow.classList.add('rotate-arrow')
    }

    function closeList() {
      svgArrow.classList.remove('rotate-arrow')
      removeAllChild(formText)
    }

    function selectItem(e) {
      e.target.classList.add('list-item-active')
      var indexOfElement = e.target.dataset.index;
      setTextFromData(formText, indexOfElement)
      selectedEl = ''
      closeList()
      closeSelect()
    }

    function setTextFromData(elem, index) {
      elem.innerText = data[index].label
      selectedEl = data[index]
    }

    function updateList(items) {
      for (let i = 0; i < items.length; i++) {
        const el = items[i]
        let item = document.createElement('li')
        item.innerHTML = `
        <li class="${(selectedEl.label == el.label) ? 'list-item-active' : ''}" tabindex = "0" data-index="${i}" > 
          ${el.label} 
        </li>
        `
        listEl.appendChild(item)
      }
    }

    function renderList() {
      formText.appendChild(listEl)
      listEl.addEventListener('click', selectItem)
    }

    function createElement(parent, elem, clazz) {
      const node = document.createElement(elem)
      if (clazz) node.classList.add(clazz)
      if (parent) parent.appendChild(node)
      return node
    }

    function removeAllChild(parent) {
      while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
      }
    }


    form.addEventListener('click', () => {
      updateList(data)
      openSelect()
      openList()
      renderList()
    })
    openBtn.addEventListener('click', () => {
      updateList(data)
      openSelect()
      openList()
      renderList()
    })
    closeBtn.addEventListener('click', () => {
      selectedEl = ''
      closeSelect()
      closeList()
    })
    setBtn.addEventListener('click', () => {
      setTextFromData(formText, 5)
      openSelect()
    })
    getBtn.addEventListener('click', () => {
      console.log(selectedEl);
    })
    destroyBtn.addEventListener('click', () => {
      removeAllChild(globalParent)
    })
  }
}

// const el = items[i];
// listEl.
// // node = 


