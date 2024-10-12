'use client'

import { useEffect, useState } from "react"
import useFetchContents from "../../hooks/settings/useFetchContents"

export default function Services() {
  const [change, setChange] = useState(false)
  const { services, loading, error, viewServices } = useFetchContents()

  useEffect(() => {
    viewServices({ change, setChange })
  }, [])

  return (
    <div id="services"  className="bg-white my-4">
      <h2 className="text-4xl font-bold p-4 text-center">Services</h2>
      <div className="w-full h-full flex flex-col gap-y-[80px] py-8 px-2">
        {loading && <div className="text-center text-lg">Loading...</div>}
        {error && <div className="text-red-500 text-center">{error}</div>}
        {services.map((service, index) => (
          <div
            key={service.id || index}
            className={`shadow-xl p-4 flex flex-col md:flex-row rounded-md w-full ${
              index % 2 === 1 ? '' : 'md:flex-row-reverse'
            }`}
          >
            <div
              className={`relative md:w-1/2 max-h-[300px] flex items-center justify-center overflow-hidden ${
                index % 2 === 1 ? 'md:rounded-l-full' : 'md:rounded-r-full'
              } rounded-md`}
            >
              <div
                className={`absolute z-10 top-0 left-0 w-full h-full bg-gradient-to-t ${
                  index % 2 === 1
                    ? 'md:bg-gradient-to-l'
                    : 'md:bg-gradient-to-r'
                } from-white to-transparent`}
              ></div>
              <img className="w-full" src={service.image} alt={service.title} />
            </div>
            <div className="w-full md:w-1/2">
              <h2 className="text-3xl text-center">
                {service.title}
                <hr className="my-5" />
              </h2>
              <p className="text-sm">{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}