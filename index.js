class Select {
  constructor({ selector, label, url }) {

    var data = data || fetchData()
    var selectedEl = null
    const initSelect = document.querySelector(selector)

    const form = document.getElementById('form')

    const openBtn = document.querySelector('#open')
    const closeBtn = document.querySelector('#close')
    const setBtn = document.querySelector('#set')
    const getBtn = document.querySelector('#get')
    const clearBtn = document.querySelector('#clear')
    const destroyBtn = document.querySelector('#destroy')

    const logMsg = document.querySelector('#log')

    const svgArrow = document.querySelector('.container svg')

    const formText = createElement(form, 'span')
    const listEl = createElement(initSelect, 'ul', 'hidden-ul')
    const formLabel = createElement(initSelect, 'label', 'lableBottom')

    initElements()
    updateList()

    function initElements() {
      formLabel.innerText = label
    }

    async function fetchData() {
      var response = await fetch('data/data.json')
      data = await response.json()
      return data
    }

    function showList() {
      updateList()
      listEl.classList.remove('hidden-ul')
      formLabel.classList.remove('lableBottom')
      formLabel.classList.add('lableTop')
      svgArrow.classList.add('rotate-arrow')
      listEl.addEventListener('click', selectItem)

      setLogMsg('show list')
    }

    function hideList() {
      listEl.classList.add('hidden-ul')
      removeAllChild(listEl)
      if (!selectedEl) {
        formLabel.classList.add('lableBottom')
        formLabel.classList.remove('lableTop')
      }
      svgArrow.classList.remove('rotate-arrow')
      listEl.removeEventListener('click', selectItem)

      setLogMsg('hide list')
    }

    function selectItem(e) {
      selectedEl = e.target.dataset.index
      updateList()
      hideList()

      setLogMsg(`selceted ${data[selectedEl].label}`)
    }

    function updateList() {
      console.log('Update');
      formText.innerText = (selectedEl) ? data[selectedEl].label : ''
      listEl.innerHTML = ''
      for (let i = 0; i < data.length; i++) {
        const el = data[i]
        let item = document.createElement('li')
        item.innerHTML = `
        <li class="${(selectedEl == i) ? 'list-item-active' : ''}" tabindex = "0" data-index="${i}" > 
          ${el.label} 
        </li>
        `
        listEl.appendChild(item)
      }
    }

    function setLogMsg(msg) {
      logMsg.innerText = msg
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

    form.addEventListener('click', showList)

    openBtn.addEventListener('click', showList)
    closeBtn.addEventListener('click', hideList)
    setBtn.addEventListener('click', () => {
      selectedEl = 5
      updateList()
      showList()
      hideList()

      setLogMsg(`Set ${selectedEl} element`)
    })
    getBtn.addEventListener('click', () => {
      console.log(data[selectedEl].label);

      setLogMsg('get element')
    })
    clearBtn.addEventListener('click', () => {
      selectedEl = null
      updateList()
      hideList()

      setLogMsg('cleared element')
    })
    destroyBtn.addEventListener('click', () => {
      removeAllChild(initSelect)

      setLogMsg('destroyed select')
    })
  }
}
