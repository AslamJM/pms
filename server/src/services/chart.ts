import { paymentModel } from '../models/payment';
import { queryAreas } from './area';

export const getPieChart = async (month: number) => {
  try {
    const areas = await queryAreas({})
    const labels = areas.map(a => a.name)
    const payments = await paymentModel.find().populate({
      path: 'shop',
      populate: {
        path: 'region',
      },
    })

    const pie: Record<string, number> = {}

    labels.forEach(l => {
      pie[l] = 0
    })

    payments.forEach(p => {
      if (p.shop) {
        //@ts-ignore
        pie[p.shop.region.name] = p.paidAmount
      }

    })

    return {
      labels: Object.keys(pie),
      data: Object.values(pie)
    }
  } catch (error) {
    console.log(error);

    return error
  }

};

